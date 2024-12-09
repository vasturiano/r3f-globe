import { createElement, forwardRef, useCallback, useRef } from 'react';
import ThreeGlobe from 'three-globe';

import fromThree from './fromThree';

const GlobeComp = fromThree(ThreeGlobe, {
  initPropNames: ['waitForGlobeReady', 'animateIn'],
  methodNames: ['getGlobeRadius', 'getCoords', 'toGeoCoords', 'pauseAnimation', 'resumeAnimation']
});

const getGlobeEventObj = ({ intersections }) => {
  const lookupGlobeObj = o => // recurse up object chain until finding the globe object
    !o ? null : o.hasOwnProperty('__globeObjType') ? o : lookupGlobeObj(o.parent);

  return lookupGlobeObj(intersections.find(d => {
    const gObj = lookupGlobeObj(d.object);
    return gObj && gObj.__globeObjType !== 'atmosphere';
  })?.object);
};

const getObjData = obj => obj?.__globeObjType === 'polygon' ? obj?.__data?.data : obj?.__data;

const Globe = forwardRef(({ onHover, onClick, ...ptProps }, ref) => {
  const curHoverObjRef = useRef(null);

  const onHoverInt = useCallback((e) => {
    if (!onHover) return;
    const hoverObj = getGlobeEventObj(e);
    if (hoverObj !== curHoverObjRef.current) {
      curHoverObjRef.current = hoverObj;
      onHover(hoverObj?.__globeObjType, getObjData(hoverObj));
    }
  },[onHover]);

  const onClickInt = useCallback((e) => {
    const obj = getGlobeEventObj(e);
    if(obj && onClick) {
      onClick(obj?.__globeObjType, getObjData(obj), e);
      e.stopPropagation();
    }
  }, [onClick]);

  return createElement(GlobeComp, {
    ...ptProps,
    ref,
    onPointerOver: onHoverInt,
    onPointerOut: onHoverInt,
    onClick: onClickInt
  });
});

export default Globe;