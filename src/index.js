import { createElement, forwardRef, useCallback, useEffect, useState } from 'react';
import ThreeGlobe from 'three-globe';

import fromThree from './fromThree';

const GlobeComp = fromThree(ThreeGlobe, {
  initPropNames: ['waitForGlobeReady', 'animateIn'],
  methodNames: ['getGlobeRadius', 'getCoords', 'toGeoCoords', 'pauseAnimation', 'resumeAnimation']
});

const getGlobeEventObj = ({ intersections }) => intersections.find(d =>
  d?.object?.hasOwnProperty('__globeObjType') && d.object.__globeObjType !== 'atmosphere')?.object;

const Globe = forwardRef(({ onHover, onClick, ...ptProps }, ref) => {
  const [curHoverObj, setCurHoverObj] = useState('init');

  useEffect(() => {
    onHover && curHoverObj !== 'init' && onHover(curHoverObj?.__globeObjType, curHoverObj?.__data);
  }, [curHoverObj, onHover]);

  const onHoverInt = useCallback((e) => setCurHoverObj(getGlobeEventObj(e)), [setCurHoverObj]);
  const onClickInt = useCallback((e) => {
    const obj = getGlobeEventObj(e);
    if(obj && onClick) {
      onClick(obj?.__globeObjType, obj?.__data, e);
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