import { createElement, forwardRef, useCallback, useRef } from 'react';
import ThreeGlobe from 'three-globe';

import fromThree from './fromThree';

const GlobeComp = fromThree(ThreeGlobe, {
  initPropNames: ['waitForGlobeReady', 'animateIn'],
  methodNames: ['getGlobeRadius', 'getCoords', 'toGeoCoords', 'pauseAnimation', 'resumeAnimation', 'setPointOfView', 'globeTileEngineClearCache']
});

const getGlobeEventObj = ({ intersections }) => {
  const lookupGlobeObj = o => // recurse up object chain until finding the globe object
    !o ? null : o.hasOwnProperty('__globeObjType') ? o : lookupGlobeObj(o.parent);

  const intersection =  intersections.find(d => {
    const gObj = lookupGlobeObj(d.object);
    return gObj && gObj.__globeObjType !== 'atmosphere';
  });

  return [lookupGlobeObj(intersection?.object), intersection];
};

const getObjData = ((obj, intersection) => (({
    polygon: d => d.data,
    particles: d => intersection && intersection.hasOwnProperty('index') && d.length > intersection.index ? d[intersection.index] : d
  }[obj?.__globeObjType]) || (d => d))(obj?.__data)
);

const Globe = forwardRef(({ onHover, onClick, ...ptProps }, ref) => {
  const curHoverObjRef = useRef(null);

  const onHoverInt = useCallback((e) => {
    if (!onHover) return;
    const [hoverObj, intersection] = getGlobeEventObj(e);
    if (hoverObj !== curHoverObjRef.current) {
      curHoverObjRef.current = hoverObj;
      onHover(hoverObj?.__globeObjType, getObjData(hoverObj, intersection));
    }
  },[onHover]);

  const onClickInt = useCallback((e) => {
    const [obj, intersection] = getGlobeEventObj(e);
    if(obj && onClick) {
      onClick(obj?.__globeObjType, getObjData(obj, intersection), e);
      e.stopPropagation();
    }
  }, [onClick]);

  return createElement(GlobeComp, {
    ...ptProps,
    ref,
    onPointerMove: onHover ? onHoverInt: undefined,
    onClick: onClick ? onClickInt : undefined
  });
});

export default Globe;