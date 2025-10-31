import * as React from 'react';
import { Object3D, Material, Vector2, Camera, Texture } from 'three';
import { ConfigOptions as ThreeGlobeConfigOptions } from 'three-globe';

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type ObjAccessor<T> = Accessor<object, T>;
type HexBinAccessor<T> = Accessor<HexBin, T>;

interface HexBin {
  points: object[],
  sumWeight: number,
  center: { lat: number, lng: number }
}

interface GeoJsonGeometry {
  type: string;
  coordinates: number[];
}

interface TypeFace {}

type LabelOrientation = 'right' | 'top' | 'bottom';

interface GeoCoords {
  lat: number;
  lng: number;
  altitude: number;
}

interface CartesianCoords {
  x: number;
  y: number;
  z: number;
}

export interface GlobeProps extends ThreeGlobeConfigOptions {
  // Globe layer
  globeImageUrl?: string | null;
  bumpImageUrl?: string | null;
  globeTileEngineUrl?: ((x: number, y: number, level: number) => string)| null;
  showGlobe?: boolean;
  showGraticules?: boolean;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  globeCurvatureResolution?: number;
  globeMaterial?: Material;
  onGlobeReady?: () => void;

  // Points layer
  pointsData?: object[];
  pointLat?: ObjAccessor<number>;
  pointLng?: ObjAccessor<number>;
  pointColor?: ObjAccessor<string>;
  pointAltitude?: ObjAccessor<number>;
  pointRadius?: ObjAccessor<number>;
  pointResolution?: number;
  pointsMerge?: boolean;
  pointsTransitionDuration?: number;

  // Arcs layer
  arcsData?: object[];
  arcStartLat?: ObjAccessor<number>;
  arcStartLng?: ObjAccessor<number>;
  arcStartAltitude?: ObjAccessor<number>;
  arcEndLat?: ObjAccessor<number>;
  arcEndLng?: ObjAccessor<number>;
  arcEndAltitude?: ObjAccessor<number>;
  arcColor?: ObjAccessor<string | string[] | ((t: number) => string)>;
  arcAltitude?: ObjAccessor<number | null>;
  arcAltitudeAutoScale?: ObjAccessor<number>;
  arcStroke?: ObjAccessor<number | null>;
  arcCurveResolution?: number;
  arcCircularResolution?: number;
  arcDashLength?: ObjAccessor<number>;
  arcDashGap?: ObjAccessor<number>;
  arcDashInitialGap?: ObjAccessor<number>;
  arcDashAnimateTime?: ObjAccessor<number>;
  arcsTransitionDuration?: number;

  // Polygons layer
  polygonsData?: object[];
  polygonGeoJsonGeometry?: ObjAccessor<GeoJsonGeometry>;
  polygonCapColor?: ObjAccessor<string>;
  polygonCapMaterial?: ObjAccessor<Material>;
  polygonSideColor?: ObjAccessor<string>;
  polygonSideMaterial?: ObjAccessor<Material>;
  polygonStrokeColor?: ObjAccessor<string | boolean | null>;
  polygonAltitude?: ObjAccessor<number>;
  polygonCapCurvatureResolution?: ObjAccessor<number>;
  polygonsTransitionDuration?: number;

  // Paths layer
  pathsData?: object[];
  pathPoints?: ObjAccessor<any[]>;
  pathPointLat?: Accessor<any, number>;
  pathPointLng?: Accessor<any, number>;
  pathPointAlt?: Accessor<any, number>;
  pathResolution?: number;
  pathColor?: ObjAccessor<string | string[] | ((t: number) => string)>;
  pathStroke?: ObjAccessor<number | null>;
  pathDashLength?: ObjAccessor<number>;
  pathDashGap?: ObjAccessor<number>;
  pathDashInitialGap?: ObjAccessor<number>;
  pathDashAnimateTime?: ObjAccessor<number>;
  pathTransitionDuration?: number;

  // Heatmaps layer
  heatmapsData?: object[];
  heatmapPoints?: ObjAccessor<any[]>;
  heatmapPointLat?: Accessor<any, number>;
  heatmapPointLng?: Accessor<any, number>;
  heatmapPointWeight?: Accessor<any, number>;
  heatmapBandwidth?: ObjAccessor<number>;
  heatmapColorFn?: ObjAccessor<(t: number) => string>;
  heatmapColorSaturation?: ObjAccessor<number>;
  heatmapBaseAltitude?: ObjAccessor<number>;
  heatmapTopAltitude?: ObjAccessor<number>;
  heatmapsTransitionDuration?: number;

  // Hex Bin layer
  hexBinPointsData?: object[];
  hexBinPointLat?: ObjAccessor<number>;
  hexBinPointLng?: ObjAccessor<number>;
  hexBinPointWeight?: ObjAccessor<number>;
  hexBinResolution?: number;
  hexMargin?: HexBinAccessor<number>;
  hexAltitude?: HexBinAccessor<number>;
  hexTopCurvatureResolution?: number;
  hexTopColor?: HexBinAccessor<string>;
  hexSideColor?: HexBinAccessor<string>;
  hexBinMerge?: boolean;
  hexTransitionDuration?: number;

  // Hexed Polygons layer
  hexPolygonsData?: object[];
  hexPolygonGeoJsonGeometry?: ObjAccessor<GeoJsonGeometry>;
  hexPolygonColor?: ObjAccessor<string>;
  hexPolygonAltitude?: ObjAccessor<number>;
  hexPolygonResolution?: ObjAccessor<number>;
  hexPolygonMargin?: ObjAccessor<number>;
  hexPolygonUseDots?: ObjAccessor<boolean>;
  hexPolygonCurvatureResolution?: ObjAccessor<number>;
  hexPolygonDotResolution?: ObjAccessor<number>;
  hexPolygonsTransitionDuration?: number;

  // Tiles layer
  tilesData?: object[];
  tileLat?: ObjAccessor<number>;
  tileLng?: ObjAccessor<number>;
  tileAltitude?: ObjAccessor<number>;
  tileWidth?: ObjAccessor<number>;
  tileHeight?: ObjAccessor<number>;
  tileUseGlobeProjection?: ObjAccessor<boolean>;
  tileMaterial?: ObjAccessor<Material>;
  tileCurvatureResolution?: ObjAccessor<number>;
  tilesTransitionDuration?: number;

  // Particles layer
  particlesData?: object[];
  particlesList?: ObjAccessor<object[]>;
  particleLat?: ObjAccessor<number>;
  particleLng?: ObjAccessor<number>;
  particleAltitude?: ObjAccessor<number>;
  particlesSize?: ObjAccessor<number>;
  particlesSizeAttenuation?: ObjAccessor<boolean>;
  particlesColor?: ObjAccessor<string>;
  particlesTexture?: ObjAccessor<Texture>;

  // Rings Layer
  ringsData?: object[];
  ringLat?: ObjAccessor<number>;
  ringLng?: ObjAccessor<number>;
  ringAltitude?: ObjAccessor<number>;
  ringColor?: ObjAccessor<string | string[] | ((t: number) => string)>;
  ringResolution?: number;
  ringMaxRadius?: ObjAccessor<number>;
  ringPropagationSpeed?: ObjAccessor<number>;
  ringRepeatPeriod?: ObjAccessor<number>;

  // Labels layer
  labelsData?: object[];
  labelLat?: ObjAccessor<number>;
  labelLng?: ObjAccessor<number>;
  labelText?: ObjAccessor<string>;
  labelColor?: ObjAccessor<string>;
  labelAltitude?: ObjAccessor<number>;
  labelSize?: ObjAccessor<number>;
  labelTypeFace?: TypeFace;
  labelRotation?: ObjAccessor<number>;
  labelResolution?: number;
  labelIncludeDot?: ObjAccessor<boolean>;
  labelDotRadius?: ObjAccessor<number>;
  labelDotOrientation?: ObjAccessor<LabelOrientation>;
  labelsTransitionDuration?: number;

  // HTML Elements layer
  htmlElementsData?: object[];
  htmlLat?: ObjAccessor<number>;
  htmlLng?: ObjAccessor<number>;
  htmlAltitude?: ObjAccessor<number>;
  htmlElement?: string | ((d: object) => HTMLElement);
  htmlTransitionDuration?: number;

  // 3D Objects layer
  objectsData?: object[];
  objectLat?: ObjAccessor<number>;
  objectLng?: ObjAccessor<number>;
  objectAltitude?: ObjAccessor<number>;
  objectRotation?: ObjAccessor<{ x?: number, y?: number, z?: number } | null>;
  objectFacesSurfaces?: ObjAccessor<boolean>;
  objectThreeObject?: Object3D | string | ((d: object) => Object3D);

  // Custom layer
  customLayerData?: object[];
  customThreeObject?: Object3D | string | ((d: object) => Object3D);
  customThreeObjectUpdate?: string | ((obj: Object3D, objData: object) => void);

  // Interaction
  onClick?: (layer: string, elemData: object | undefined, event: React.MouseEvent) => void;
  onHover?: (layer: string | undefined, elemData: object | undefined) => void;

  // Render options
  rendererSize?: Vector2;
}

export interface GlobeMethods {
  // Render control
  pauseAnimation(): void;
  resumeAnimation(): void;
  setPointOfView(camera: Camera): void;

  // Utility
  getGlobeRadius(): number;
  getCoords(lat: number, lng: number, altitude?: number): CartesianCoords;
  toGeoCoords(coords: CartesianCoords): GeoCoords;

  // Other
  globeTileEngineClearCache(): void;
}

type FCwithRef<P = {}, R = {}> = React.FunctionComponent<P & { ref?: React.MutableRefObject<R | undefined> }>;

declare const R3fGlobe: FCwithRef<GlobeProps, GlobeMethods>;

export default R3fGlobe;
