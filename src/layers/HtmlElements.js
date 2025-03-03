import { Html } from "@react-three/drei";
import accessorFn from 'accessor-fn';
import ThreeGlobe from 'three-globe';

export const propKeys = [
  'htmlElementsData',
  'htmlLat',
  'htmlLng',
  'htmlAltitude',
  'htmlElement'
];

const globe = new ThreeGlobe();
const polar2Cartesian = (lat, lng, alt) => globe.getCoords(lat, lng, alt);

const HtmlElements = ({
  htmlElementsData = [],
  htmlLat = 'lat',
  htmlLng = 'lng',
  htmlAltitude = 0,
  htmlElement
}) => {
  // Shortcut out if layer is unused
  if (!htmlElementsData.length || !htmlElement) return false;

  // Data accessors
  const lat = accessorFn(htmlLat);
  const lng = accessorFn(htmlLng);
  const alt = accessorFn(htmlAltitude);

  return <>{
    htmlElementsData.map(d => {
      const { x, y, z } = polar2Cartesian(lat(d), lng(d), alt(d));
      return <Html position={[x, y, z]} center occlude="blending">
        {htmlElement(d)}
      </Html>;
    })
  }</>;
}

export default HtmlElements;