import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { omit } from 'jerrypick';

export default function fromThree(ThreeComponent, {
    methodNames = [],
    initPropNames = []
  } = {}) {

  return forwardRef((props = {}, ref) => {
    // instantiate the three component with the defined initPropNames
    const threeObj = useMemo(() => new ThreeComponent(
      Object.fromEntries(
        initPropNames
         .filter(p => props.hasOwnProperty(p))
         .map(prop => [prop, props[prop]])
      )
    ), []);

    useEffect(() => {
      // invoke destructor on unmount, if it exists
      return threeObj._destructor instanceof Function ? threeObj._destructor : undefined;
    }, [threeObj]);

    // Call a component method
    const _call = useCallback((method, ...args) =>
      threeObj[method] instanceof Function
        ? threeObj[method](...args)
        : undefined // method not found
    , [threeObj]);

    const passThroughProps = Object.fromEntries(Object.entries(props)
      .filter(([k]) => !threeObj[k] || !(threeObj[k] instanceof Function)));

    // propagate component props that have changed
    const prevPropsRef = useRef({});
    Object.keys(omit(props, [...methodNames, ...initPropNames, ...Object.keys(passThroughProps)]))
      .filter(p => prevPropsRef.current[p] !== props[p])
      .forEach(p => _call(p, props[p]));
    prevPropsRef.current = props;

    // bind external methods to parent ref
    useImperativeHandle(ref, () => Object.fromEntries(
      methodNames.map(method =>
        [
          method,
          (...args) => _call(method, ...args)
        ]
      )
    ));

    return createElement('primitive', {
      ...passThroughProps,
      object: threeObj,
    });
  });
}
