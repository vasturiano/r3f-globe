React-Three-Fiber Globe Visualization
=====================================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

<p align="center">
  <a href="//vasturiano.github.io/r3f-globe/example/multiple-globes/"><img width="80%" src="https://vasturiano.github.io/r3f-globe/example/preview.png"></a>
</p>

[React-Three-Fiber](https://github.com/pmndrs/react-three-fiber) bindings for the [three-globe](https://github.com/vasturiano/three-globe) ThreeJS component.

#### Check out the examples:
* [Basic](https://vasturiano.github.io/r3f-globe/example/basic/) ([source](https://github.com/vasturiano/r3f-globe/blob/master/example/basic/index.html))
* [Scene with multiple globe styles](https://vasturiano.github.io/r3f-globe/example/multiple-globes/) ([source](https://github.com/vasturiano/r3f-globe/blob/master/example/multiple-globes/index.html))
* [Tiled Map Engine](https://vasturiano.github.io/r3f-globe/example/tile-engine/) ([source](https://github.com/vasturiano/r3f-globe/blob/master/example/tile-engine/index.html))
* [Satellites](https://vasturiano.github.io/r3f-globe/example/satellites/) ([source](https://github.com/vasturiano/r3f-globe/blob/master/example/satellites/index.html))

## Quick start

```js
import R3fGlobe from 'r3f-globe';
```
or using a *script* tag
```html
<script src="//unpkg.com/r3f-globe"></script>
```
then
```jsx
<Canvas>
  <R3fGlobe 
    pointsData={myData}
  />
</Canvas>
```

## API reference

* [Globe Layer](#globe-layer)
* [Points Layer](#points-layer)
* [Arcs Layer](#arcs-layer)
* [Polygons Layer](#polygons-layer)
* [Paths Layer](#paths-layer)
* [Heatmaps Layer](#heatmaps-layer)
* [Hex Bin Layer](#hex-bin-layer)
* [Hexed Polygons Layer](#hexed-polygons-layer)
* [Tiles Layer](#tiles-layer)
* [Particles Layer](#particles-layer)
* [Rings Layer](#rings-layer)
* [Labels Layer](#labels-layer)
* [HTML Elements Layer](#html-elements-layer)
* [3D Objects Layer](#3d-objects-layer)
* [Custom Layer](#custom-layer)
* [Interaction](#interaction)
* [Render Control](#render-control)
* [Utility](#utility)

### Globe Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>globeImageUrl</b> | <i>string</i>| *-* | URL of the image used in the material that wraps the globe. This image should follow an [equirectangular projection](https://en.wikipedia.org/wiki/Equirectangular_projection). If no image is provided, the globe is represented as a black sphere. |
| <b>bumpImageUrl</b> | <i>string</i>| *-* | URL of the image used to create a [bump map](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.bumpMap) in the material, to represent the globe's terrain. This image should follow an [equirectangular projection](https://en.wikipedia.org/wiki/Equirectangular_projection). |
| <b>globeTileEngineUrl</b> | <i>func(x, y, l)</i> | *-* | Function that defines the URL of the [slippy map](https://en.wikipedia.org/wiki/Tiled_web_map) tile engine to cover the globe surface. The slippy map coordinates `x`, `y` and `l` (zoom level) are passed as arguments and the function is expected to return a URL string. A falsy value will disable the tiling engine. |
| <b>showGlobe</b> | <i>bool</i> | `true` | Whether to show the globe surface itself. |
| <b>showGraticules</b> | <i>bool</i> | `false` | Whether to show a graticule grid demarking latitude and longitude lines at every 10 degrees. |
| <b>showAtmosphere</b> | <i>bool</i> | `true` | Whether to show a bright halo surrounding the globe, representing the atmosphere. |
| <b>atmosphereColor</b> | <i>string</i> | `lightskyblue` | The color of the atmosphere. |
| <b>atmosphereAltitude</b> | <i>string</i> | 0.15 | The max altitude of the atmosphere, in terms of globe radius units. |
| <b>globeMaterial</b> | <i>Material</i> | [MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) | ThreeJS material used to wrap the globe. |
| <b>onGlobeReady</b> | <i>func</i> | *-* | Callback function to invoke immediately after the globe has been initialized and visible on the scene. |

### Points Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>pointsData</b> | <i>array</i> | `[]` | List of points to represent in the points map layer. Each point is displayed as a cylindrical 3D object rising perpendicularly from the surface of the globe. |
| <b>pointLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Point object accessor function, attribute or a numeric constant for the cylinder's center latitude coordinate. |
| <b>pointLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Point object accessor function, attribute or a numeric constant for the cylinder's center longitude coordinate. |
| <b>pointColor</b> | <i>string</i> or <i>func</i> | `() => '#ffffaa'` | Point object accessor function or attribute for the cylinder color. |
| <b>pointAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.1 | Point object accessor function, attribute or a numeric constant for the cylinder's altitude in terms of globe radius units (`0` = 0 altitude (flat circle), `1` = globe radius). |
| <b>pointRadius</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.25 | Point object accessor function, attribute or a numeric constant for the cylinder's radius, in angular degrees. |
| <b>pointResolution</b> | <i>number</i> | 12 | Radial geometric resolution of each cylinder, expressed in how many slice segments to divide the circumference. Higher values yield smoother cylinders. |
| <b>pointsMerge</b> | <i>bool</i> | `false` | Whether to merge all the point meshes into a single ThreeJS object, for improved rendering performance. Visually both options are equivalent, setting this option only affects the internal organization of the ThreeJS objects. |
| <b>pointsTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate point changes involving geometry modifications. A value of `0` will move the objects immediately to their final position. New objects are animated by scaling them from the ground up. Only works if `pointsMerge` is disabled. |

### Arcs Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>arcsData</b> | <i>array</i> | `[]` | List of links to represent in the arcs map layer. Each link is displayed as an arc line that rises from the surface of the globe, connecting the start and end coordinates. |
| <b>arcStartLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `startLat` | Arc object accessor function, attribute or a numeric constant for the line's start latitude coordinate. |
| <b>arcStartLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `startLng` | Arc object accessor function, attribute or a numeric constant for the line's start longitude coordinate. |
| <b>arcEndLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `endLat` | Arc object accessor function, attribute or a numeric constant for the line's end latitude coordinate. |
| <b>arcEndLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `endLng` | Arc object accessor function, attribute or a numeric constant for the line's end longitude coordinate. |
| <b>arcColor</b> | <i>string</i>, <i>[string, ...]</i> or <i>func</i> | `() => '#ffffaa'` | Arc object accessor function or attribute for the line's color. Also supports color gradients by passing an array of colors, or a color interpolator function. |
| <b>arcAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i>| `null` |Arc object accessor function, attribute or a numeric constant for the arc's maximum altitude (ocurring at the half-way distance between the two points) in terms of globe radius units (`0` = 0 altitude (ground line), `1` = globe radius). If a value of `null` or `undefined` is used, the altitude is automatically set proportionally to the distance between the two points, according to the scale set in `arcAltitudeAutoScale`. |
| <b>arcAltitudeAutoScale</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.5 | Arc object accessor function, attribute or a numeric constant for the scale of the arc's automatic altitude, in terms of units of the great-arc distance between the two points. A value of `1` indicates the arc should be as high as its length on the ground. Only applicable if `arcAltitude` is not set. |
| <b>arcStroke</b> | <i>number</i>, <i>string</i> or <i>func</i>| `null` | Arc object accessor function, attribute or a numeric constant for the line's diameter, in angular degrees. A value of `null` or `undefined` will render a [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) whose width is constant (`1px`) regardless of the camera distance. Otherwise, a [TubeGeometry](https://threejs.org/docs/#api/en/geometries/TubeGeometry) is used. |
| <b>arcCurveResolution</b> | <i>number</i> | 64 | Arc's curve resolution, expressed in how many straight line segments to divide the curve by. Higher values yield smoother curves. |
| <b>arcCircularResolution</b> | <i>number</i> | 6 | Radial geometric resolution of each line, expressed in how many slice segments to divide the tube's circumference. Only applicable when using Tube geometries (defined `arcStroke`). |
| <b>arcDashLength</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Arc object accessor function, attribute or a numeric constant for the length of the dashed segments in the arc, in terms of relative length of the whole line (`1` = full line length). |
| <b>arcDashGap</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Arc object accessor function, attribute or a numeric constant for the length of the gap between dash segments, in terms of relative line length. |
| <b>arcDashInitialGap</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Arc object accessor function, attribute or a numeric constant for the length of the initial gap before the first dash segment, in terms of relative line length. |
| <b>arcDashAnimateTime</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Arc object accessor function, attribute or a numeric constant for the time duration (in `ms`) to animate the motion of dash positions from the start to the end point for a full line length. A value of `0` disables the animation. |
| <b>arcsTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate arc changes involving geometry modifications. A value of `0` will move the arcs immediately to their final position. New arcs are animated by rising them from the ground up. |

### Polygons Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>polygonsData</b> | <i>array</i> | `[]` | List of polygon shapes to represent in the polygons map layer. Each polygon is displayed as a shaped cone that extrudes from the surface of the globe. |
| <b>polygonGeoJsonGeometry</b> | <i>string</i> or <i>func</i> | `geometry` | Polygon object accessor function or attribute for the GeoJson geometry specification of the polygon's shape. The returned value should have a minimum of two fields: `type` and `coordinates`. Only GeoJson geometries of type `Polygon` or `MultiPolygon` are supported, other types will be skipped. |
| <b>polygonCapColor</b> | <i>string</i> or <i>func</i> | `() => '#ffffaa'` | Polygon object accessor function or attribute for the color of the top surface. |
| <b>polygonCapMaterial</b> | <i>Material</i>, <i>string</i> or <i>func</i> | *-* | Polygon object accessor function, attribute or material object for the [ThreeJS material](https://threejs.org/docs/#api/en/materials/Material) to use in the top surface. This prop takes precedence over `polygonCapColor`, which will be ignored if both are defined. |
| <b>polygonSideColor</b> | <i>string</i> or <i>func</i> | `() => '#ffffaa'` | Polygon object accessor function or attribute for the color of the cone sides. |
| <b>polygonSideMaterial</b> | <i>Material</i>, <i>string</i> or <i>func</i> | *-* | Polygon object accessor function, attribute or material object for the [ThreeJS material](https://threejs.org/docs/#api/en/materials/Material) to use in the cone sides. This prop takes precedence over `polygonSideColor`, which will be ignored if both are defined. |
| <b>polygonStrokeColor</b> | <i>string</i> or <i>func</i> | *-* | Polygon object accessor function or attribute for the color to stroke the polygon perimeter. A falsy value will disable the stroking. |
| <b>polygonAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.01 | Polygon object accessor function, attribute or a numeric constant for the polygon cone's altitude in terms of globe radius units (`0` = 0 altitude (flat polygon), `1` = globe radius). |
| <b>polygonCapCurvatureResolution</b> | <i>number</i>, <i>string</i> or <i>func</i> | 5 | Polygon object accessor function, attribute or a numeric constant for the resolution (in angular degrees) of the cap surface curvature. The finer the resolution, the more the polygon is fragmented into smaller faces to approximate the spheric surface, at the cost of performance. |
| <b>polygonsTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate polygon altitude changes. A value of `0` will size the cone immediately to their final altitude. New polygons are animated by rising them from the ground up. |

### Paths Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>pathsData</b> | <i>array</i> | `[]` | List of lines to represent in the paths map layer. Each path is displayed as a line that connects all the coordinate pairs in the path array. |
| <b>pathPoints</b> | <i>array</i>, <i>string</i> or <i>func</i> | `pnts => pnts` | Path object accessor function, attribute or an array for the set of points that define the path line. By default, each path point is assumed to be a 2-position array (`[<lat>, <lon>]`). This default behavior can be modified using the `pathPointLat` and `pathPointLng` methods. |
| <b>pathPointLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `arr => arr[0]` | Path point object accessor function, attribute or a numeric constant for the latitude coordinate. |
| <b>pathPointLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `arr => arr[1]` | Path point object accessor function, attribute or a numeric constant for the longitude coordinate. |
| <b>pathPointAlt</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.001 | Path point object accessor function, attribute or a numeric constant for the point altitude, in terms of globe radius units (`0` = 0 altitude (ground), `1` = globe radius). |
| <b>pathResolution</b> | <i>number</i> | 2 | The path's angular resolution, in lat/lng degrees. If the ground distance (excluding altitude) between two adjacent path points is larger than this value, the line segment will be interpolated in order to approximate the curvature of the sphere surface. Lower values yield more perfectly curved lines, at the cost of performance. |
| <b>pathColor</b> | <i>string</i>, <i>[string, ...]</i> or <i>func</i> | `() => '#ffffaa'` | Path object accessor function or attribute for the line's color. Also supports color gradients by passing an array of colors, or a color interpolator function. Transparent colors are not supported in Fat Lines with set width. |
| <b>pathStroke</b> | <i>number</i>, <i>string</i> or <i>func</i> | `null` | Path object accessor function, attribute or a numeric constant for the line's diameter, in angular degrees. A value of `null` or `undefined` will render a [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) whose width is constant (`1px`) regardless of the camera distance. Otherwise, a [FatLine](https://github.com/vasturiano/three-fatline) is used. |
| <b>pathDashLength</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Path object accessor function, attribute or a numeric constant for the length of the dashed segments in the path line, in terms of relative length of the whole line (`1` = full line length). |
| <b>pathDashGap</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Path object accessor function, attribute or a numeric constant for the length of the gap between dash segments, in terms of relative line length. |
| <b>pathDashInitialGap</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Path object accessor function, attribute or a numeric constant for the length of the initial gap before the first dash segment, in terms of relative line length. |
| <b>pathDashAnimateTime</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Path object accessor function, attribute or a numeric constant for the time duration (in `ms`) to animate the motion of dash positions from the start to the end point for a full line length. A value of `0` disables the animation. |
| <b>pathTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate path changes. A value of `0` will move the paths immediately to their final position. New paths are animated from start to end. |

### Heatmaps Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>heatmapsData</b> | <i>array</i> | `[]` | List of heatmap datasets to represent in the heatmaps map layer. Each set of points is represented as an individual global heatmap with varying color and/or altitude, according to the point density. It uses a [Gaussian KDE](https://en.wikipedia.org/wiki/Kernel_density_estimation) to perform the density estimation, based on the great-arc distance between points. |
| <b>heatmapPoints</b> | <i>array</i>, <i>string</i> or <i>func</i> | `pnts => pnts` | Heatmap object accessor function, attribute or an array for the set of points that define the heatmap. By default, each point is assumed to be a 2-position array (`[<lat>, <lon>]`). This default behavior can be modified using the `heatmapPointLat` and `heatmapPointLng` methods. |
| <b>heatmapPointLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `arr => arr[0]` | Heatmap point object accessor function, attribute or a numeric constant for the latitude coordinate. |
| <b>heatmapPointLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `arr => arr[1]` | Heatmap point object accessor function, attribute or a numeric constant for the longitude coordinate. |
| <b>heatmapPointWeight</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Heatmap point object accessor function, attribute or a numeric constant for the weight of the point. The weight of a point determines its influence on the density of the surrounding area. |
| <b>heatmapBandwidth</b> | <i>number</i>, <i>string</i> or <i>func</i> | 2.5 | Heatmap object accessor function, attribute or a numeric constant for the heatmap bandwidth, in angular degrees. The bandwidth is an internal parameter of the [Gaussian kernel function](https://en.wikipedia.org/wiki/Gaussian_function) and defines how localized is the influence of a point on distant locations. A narrow bandwidth leads to a more spiky representation, while a broad one has smoother curves. |
| <b>heatmapColorFn</b> | <i>string</i> or <i>func</i> | [Turbo colormap](https://blog.research.google/2019/08/turbo-improved-rainbow-colormap-for.html) interpolator with fading opacity | Heatmap object accessor function or attribute for the color interpolator function to represent density in the heatmap. This function should receive a number between `0` and `1` (or potentially higher if saturation > 1), and return a color string. |
| <b>heatmapColorSaturation</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1.5 | Heatmap object accessor function, attribute or a numeric constant for the color scale saturation. The saturation is a multiplier of the normalized density value (`[0,1]`) before passing it to the color interpolation function. It can be used to dampen outlier peaks in density and bring the data floor into view. |
| <b>heatmapBaseAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.01 | Heatmap object accessor function, attribute or a numeric constant for the heatmap base floor altitude in terms of globe radius units (`0` = 0 altitude, `1` = globe radius). |
| <b>heatmapTopAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | - | Heatmap object accessor function, attribute or a numeric constant for the heatmap top peak altitude in terms of globe radius units (`0` = 0 altitude, `1` = globe radius). An equal value to the base altitude will yield a surface flat heatmap. If a top altitude is set, the variations in density will be used to define the altitude curves between base and top. |
| <b>heatmapsTransitionDuration</b> | <i>number</i> | 0 | Duration (ms) of the transition to animate heatmap changes. A value of `0` will set the heatmap colors/altitudes immediately in their final position. New heatmaps are animated by rising them from the ground up and gently fading in through the color scale. |

### Hex Bin Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>hexBinPointsData</b> | <i>array</i> | `[]` | List of points to aggregate using the hex bin map layer. Each point is added to an hexagonal prism 3D object that represents all the points within a tesselated portion of the space. |
| <b>hexBinPointLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Point object accessor function, attribute or a numeric constant for the latitude coordinate. |
| <b>hexBinPointLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Point object accessor function, attribute or a numeric constant for the longitude coordinate. |
| <b>hexBinPointWeight</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Point object accessor function, attribute or a numeric constant for the weight of the point. Weights for points in the same bin are summed and determine the hexagon default altitude. |
| <b>hexBinResolution</b> | <i>number</i> | 4 | The geographic binning resolution as defined by [H3](https://uber.github.io/h3/#/documentation/core-library/resolution-table). Determines the area of the hexagons that tesselate the globe's surface. Accepts values between `0` and `15`. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons. |
| <b>hexMargin</b> | <i>number</i> or <i>func</i> | 0.2 | The radial margin of each hexagon. Margins above `0` will create gaps between adjacent hexagons and serve only a visual purpose, as the data points within the margin still contribute to the hexagon's data. The margin is specified in terms of fraction of the hexagon's surface diameter. Values below `0` or above `1` are disadvised. This property also supports using an accessor method based on the hexagon's aggregated data, following the syntax: `hexMargin(({ points, sumWeight, center: { lat, lng }}) => ...)`. This method should return a numeric constant. |
| <b>hexAltitude</b> | <i>number</i> or <i>func</i> | `({ sumWeight }) => sumWeight * 0.01` | The altitude of each hexagon, in terms of globe radius units (`0` = 0 altitude (flat hexagon), `1` = globe radius). This property also supports using an accessor method based on the hexagon's aggregated data, following the syntax: `hexAltitude(({ points, sumWeight, center: { lat, lng }}) => ...)`. This method should return a numeric constant. |
| <b>hexTopCurvatureResolution</b> | <i>number</i> | 5 | The resolution (in angular degrees) of the top surface curvature. The finer the resolution, the more the top area is fragmented into smaller faces to approximate the spheric surface, at the cost of performance. |
| <b>hexTopColor</b> | <i>func</i> | `() => '#ffffaa'` | Accessor method for each hexagon's top color. The method should follow the signature: `hexTopColor(({ points, sumWeight, center: { lat, lng }}) => ...)` and return a color string. |
| <b>hexSideColor</b> | <i>func</i> | `() => '#ffffaa'` | Accessor method for each hexagon's side color. The method should follow the signature: `hexSideColor(({ points, sumWeight, center: { lat, lng }}) => ...)` and return a color string. |
| <b>hexBinMerge</b> | <i>bool</i> | `false` | Whether to merge all the hexagon meshes into a single ThreeJS object, for improved rendering performance. Visually both options are equivalent, setting this option only affects the internal organization of the ThreeJS objects. |
| <b>hexTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate hexagon changes related to geometry modifications (altitude, radius). A value of `0` will move the hexagons immediately to their final position. New hexagons are animated by scaling them from the ground up. Only works if `hexBinMerge` is disabled. |

### Hexed Polygons Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>hexPolygonsData</b> | <i>array</i> | `[]` | List of polygon shapes to represent in the hexed polygons map layer. Each polygon is displayed as a tesselated group of hexagons that approximate the polygons shape according to the resolution specified in `hexPolygonResolution`. |
| <b>hexPolygonGeoJsonGeometry</b> | <i>string</i> or <i>func</i> | `geometry` | Hexed polygon object accessor function or attribute for the GeoJson geometry specification of the polygon's shape. The returned value should have a minimum of two fields: `type` and `coordinates`. Only GeoJson geometries of type `Polygon` or `MultiPolygon` are supported, other types will be skipped. |
| <b>hexPolygonColor</b> | <i>string</i> or <i>func</i> | `() => '#ffffaa'` | Hexed polygon object accessor function or attribute for the color of each hexagon in the polygon. |
| <b>hexPolygonAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.001 | Hexed polygon object accessor function, attribute or a numeric constant for the polygon's hexagons altitude in terms of globe radius units (`0` = 0 altitude, `1` = globe radius). |
| <b>hexPolygonResolution</b> | <i>number</i>, <i>string</i> or <i>func</i> | 3 | Hexed polygon object accessor function, attribute or a numeric constant for the geographic binning resolution as defined by [H3](https://uber.github.io/h3/#/documentation/core-library/resolution-table). Determines the area of the hexagons that tesselate the globe's surface. Accepts values between `0` and `15`. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons. |
| <b>hexPolygonMargin</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.2 | Hexed polygon object accessor function, attribute or a numeric constant for the radial margin of each hexagon. Margins above `0` will create gaps between adjacent hexagons within a polygon. The margin is specified in terms of fraction of the hexagon's surface diameter. Values below `0` or above `1` are disadvised. |
| <b>hexPolygonUseDots</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `false` | Hexed polygon object accessor function, attribute or a boolean constant for whether to represent each polygon point as a circular dot instead of an hexagon. |
| <b>hexPolygonCurvatureResolution</b> | <i>number</i>, <i>string</i> or <i>func</i> | 5 | Hexed polygon object accessor function, attribute or a numeric constant for the resolution (in angular degrees) of each hexed polygon surface curvature. The finer the resolution, the more the polygon hexes are fragmented into smaller faces to approximate the spheric surface, at the cost of performance. |
| <b>hexPolygonDotResolution</b> | <i>number</i>, <i>string</i> or <i>func</i> | 12 | Hexed polygon object accessor function, attribute or a numeric constant for the resolution of each circular dot, expressed in how many slice segments to divide the circumference. Higher values yield smoother circles, at the cost of performance. This is only applicable in dot representation mode. |
| <b>hexPolygonsTransitionDuration</b> | <i>number</i> | 0 | Duration (ms) of the transition to animate hexed polygons altitude and margin changes. A value of `0` will move the hexagons immediately to their final state. New hexed polygons are animated by sizing each hexagon from `0` radius. |

### Tiles Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>tilesData</b> | <i>array</i> | `[]` | List of tiles to represent in the tiles map layer. Each tile is displayed as a spherical surface segment. The segments can be placed side-by-side for a tiled surface and each can be styled separately. |
| <b>tileLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Tile object accessor function, attribute or a numeric constant for the segment's centroid latitude coordinate. |
| <b>tileLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Tile object accessor function, attribute or a numeric constant for the segment's centroid longitude coordinate. |
| <b>tileAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.01 | Tile object accessor function, attribute or a numeric constant for the segment's altitude in terms of globe radius units. |
| <b>tileWidth</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Tile object accessor function, attribute or a numeric constant for the segment's longitudinal width, in angular degrees. |
| <b>tileHeight</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Tile object accessor function, attribute or a numeric constant for the segment's latitudinal height, in angular degrees. |
| <b>tileUseGlobeProjection</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `true` | Tile object accessor function, attribute or a boolean constant for whether to use the globe's projection to shape the segment to its relative tiled position (`true`), or break free from this projection and shape the segment as if it would be laying directly on the equatorial perimeter (`false`). |
| <b>tileMaterial</b> | <i>Material</i>, <i>string</i> or <i>func</i> | `() => new MeshLambertMaterial({ color: '#ffbb88' })` | Tile object accessor function, attribute or material object for the [ThreeJS material](https://threejs.org/docs/#api/en/materials/Material) used to style the segment's surface. |
| <b>tileCurvatureResolution</b> | <i>number</i>, <i>string</i> or <i>func</i> | 5 | Tile object accessor function, attribute or a numeric constant for the resolution (in angular degrees) of the surface curvature. The finer the resolution, the more the tile geometry is fragmented into smaller faces to approximate the spheric surface, at the cost of performance. |
| <b>tilesTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate tile changes involving geometry modifications. A value of `0` will move the tiles immediately to their final position. New tiles are animated by scaling them from the centroid outwards. |

### Particles Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>particlesData</b> | <i>array</i> | `[]` | List of particle sets to represent in the particles map layer. Each particle set is displayed as a group of [Points](https://threejs.org/docs/#api/en/objects/Points). Each point in the group is a geometry vertex and can be individually positioned anywhere relative to the globe. |
| <b>particlesList</b> | <i>string</i> or <i>func</i> | `d => d` | Particle set accessor function or attribute for the list of particles in the set. By default, the data structure is expected to be an array of arrays of individual particle objects. |
| <b>particleLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Particle object accessor function, attribute or a numeric constant for the latitude coordinate. |
| <b>particleLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Particle object accessor function, attribute or a numeric constant for the longitude coordinate. |
| <b>particleAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.01 | Particle object accessor function, attribute or a numeric constant for the altitude in terms of globe radius units. |
| <b>particlesSize</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.5 | Particle set accessor function, attribute or a numeric constant for the size of all the particles in the group. |
| <b>particlesSizeAttenuation</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `true` | Particle set accessor function, attribute or a boolean constant for whether the size of each particle on the screen should be attenuated according to the distance to the camera. |
| <b>particlesColor</b> | <i>string</i> or <i>func</i> | `white` | Particle set accessor function or attribute for the color of all the particles in the group. This setting will be ignored if `particlesTexture` is defined. |
| <b>particlesTexture</b> | <i>string</i> or <i>func</i> | - | Particle set accessor function or attribute for the [Texture](https://threejs.org/docs/#api/en/textures/Texture) to be applied to all the particles in the group. |

### Rings Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>ringsData</b> | <i>array</i> | `[]` | List of self-propagating ripple rings to represent in the rings map layer. Each data point is displayed as an animated set of concentric circles that propagate outwards from (or inwards to) a central point through the spherical surface. |
| <b>ringLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Ring object accessor function, attribute or a numeric constant for each circle's center latitude coordinate. |
| <b>ringLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Ring object accessor function, attribute or a numeric constant for each circle's center longitude coordinate. |
| <b>ringAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.0015 | Ring object accessor function, attribute or a numeric constant for the circle's altitude in terms of globe radius units. |
| <b>ringColor</b> | <i>string</i>, <i>[string, ...]</i> or <i>func</i> | `() => '#ffffaa'` | Ring object accessor function or attribute for the stroke color of each ring. Also supports radial color gradients by passing an array of colors, or a color interpolator function. |
| <b>ringResolution</b> | <i>number</i> | 64 | Geometric resolution of each circle, expressed in how many slice segments to divide the circumference. Higher values yield smoother circles. |
| <b>ringMaxRadius</b> | <i>number</i>, <i>string</i> or <i>func</i> | 2 | Ring object accessor function, attribute or a numeric constant for the maximum outer radius of the circles, at which the rings stop propagating and are removed. Defined in angular degrees. |
| <b>ringPropagationSpeed</b> | <i>number</i>, <i>string</i> or <i>func</i> | 1 | Ring object accessor function, attribute or a numeric constant for the propagation velocity of the rings, defined in degrees/second. Setting a negative value will invert the direction and cause the rings to propagate inwards from the `maxRadius`. |
| <b>ringRepeatPeriod</b> | <i>number</i>, <i>string</i> or <i>func</i> | 700 | Ring object accessor function, attribute or a numeric constant for the interval of time (in ms) to wait between consecutive auto-generated concentric circles. A value less or equal than `0` will disable the repetition and emit a single ring. |

### Labels Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>labelsData</b> | <i>array</i> | `[]` | List of label objects to represent in the labels map layer. |
| <b>labelLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Label object accessor function, attribute or a numeric constant for the latitude coordinate. |
| <b>labelLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Label object accessor function, attribute or a numeric constant for the longitude coordinate. |
| <b>labelText</b> | <i>string</i> or <i>func</i> | `text` | Label object accessor function or attribute for the label text. |
| <b>labelColor</b> | <i>string</i> or <i>func</i> | `() => 'lightgrey'` | Label object accessor function or attribute for the label color. |
| <b>labelAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Label object accessor function, attribute or a numeric constant for the label altitude in terms of globe radius units. |
| <b>labelSize</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.5 | Label object accessor function, attribute or a numeric constant for the label text height, in angular degrees. |
| <b>labelTypeFace</b> | <i>typeface object </i> | [helvetiker regular](https://github.com/mrdoob/three.js/blob/dev/examples/fonts/helvetiker_regular.typeface.json) | Text font typeface JSON object. Supports any typeface font generated by [Facetype.js](http://gero3.github.io/facetype.js/). |
| <b>labelRotation</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | Label object accessor function, attribute or a numeric constant for the label rotation in degrees. The rotation is performed clockwise along the axis of its latitude parallel plane. |
| <b>labelResolution</b> | <i>number</i> | 3 | The text geometric resolution of each label, expressed in how many segments to use in the text curves. Higher values yield smoother labels. |
| <b>labelIncludeDot</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `true` | Label object accessor function, attribute or a bool constant for whether to include a dot marker next to the text indicating the exact `lat`, `lng` coordinates of the label. If enabled the text will be rendered offset from the dot. |
| <b>labelDotRadius</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.1 | Label object accessor function, attribute or a numeric constant for the radius of the dot marker, in angular degrees. |
| <b>labelDotOrientation</b> | <i>string</i> or <i>func</i> | `() => 'bottom'` | Label object accessor function or attribute for the orientation of the label if the dot marker is present. Possible values are `right`, `top` and `bottom`. |
| <b>labelsTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate label changes involving position modifications (`lat`, `lng`, `altitude`, `rotation`). A value of `0` will move the labels immediately to their final position. New labels are animated by scaling their size. |

### HTML Elements Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>htmlElementsData</b> | <i>array</i> | `[]` | List objects to represent in the HTML elements map layer. Each HTML element is rendered using [ThreeJS CSS2DRenderer](https://threejs.org/docs/#examples/en/renderers/CSS2DRenderer). |
| <b>htmlLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | HTML element accessor function, attribute or a numeric constant for the latitude coordinate of the element's central position. |
| <b>htmlLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | HTML element accessor function, attribute or a numeric constant for the longitude coordinate of the element's central position. |
| <b>htmlAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0 | HTML element accessor function, attribute or a numeric constant for the altitude coordinate of the element's position, in terms of globe radius units. |
| <b>htmlElement</b> | <i>string</i> or <i>func</i> | `null` | Accessor function or attribute to retrieve the DOM element to use. Should return an instance of [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). |
| <b>htmlTransitionDuration</b> | <i>number</i> | 1000 | Duration (ms) of the transition to animate HTML elements position changes. A value of `0` will move the elements immediately to their final position. |

### 3D Objects Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>objectsData</b> | <i>array</i> | `[]` | Getter/setter for the list of custom 3D objects to represent in the objects layer. Each object is rendered according to the `objectThreeObject` method. |
| <b>objectLat</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lat` | Object accessor function, attribute or a numeric constant for the latitude coordinate of the object's position. |
| <b>objectLng</b> | <i>number</i>, <i>string</i> or <i>func</i> | `lng` | Object accessor function, attribute or a numeric constant for the longitude coordinate of the object's position. |
| <b>objectAltitude</b> | <i>number</i>, <i>string</i> or <i>func</i> | 0.01 | Object accessor function, attribute or a numeric constant for the altitude coordinate of the object's position, in terms of globe radius units. |
| <b>objectRotation</b> | <i>{[x], [y], [z]}</i>, <i>string</i> or <i>func</i> | | Object accessor function, attribute or a `{x, y, z}` object for the object's rotation (in degrees). Each dimension is optional, allowing for rotation only in some axes. Rotation is applied in the order **X**->**Y**->**Z**. |
| <b>objectFacesSurface</b> | <i>bool</i>, <i>string</i> or <i>func</i> | `true` | Object accessor function, attribute or a boolean constant for whether the object should be rotated to face (away from) the globe surface (`true`), or be left in its original universe orientation (`false`). |
| <b>objectThreeObject</b> | <i>Object3d</i>, <i>string</i> or <i>func</i> | *A yellow sphere* | Object accessor function or attribute for defining a custom 3d object to render as part of the objects map layer. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). |

### Custom Layer

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>customLayerData</b> | <i>array</i> | `[]` | List of items to represent in the custom map layer. Each item is rendered according to the `customThreeObject` method. |
| <b>customThreeObject</b> | <i>Object3d</i>, <i>string</i> or <i>func</i>| *-* |Object accessor function or attribute for generating a custom 3d object to render as part of the custom map layer. Should return an instance of [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). |
| <b>customThreeObjectUpdate</b> | <i>string</i> or <i>func</i>| *-* |Object accessor function or attribute for updating an existing custom 3d object with new data. This can be used for performance improvement on data updates as the objects don't need to be removed and recreated at each update. The callback method's signature includes the object to be update and its new data: `customThreeObjectUpdate((obj, objData) => { ... })`. |

### Interaction

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>onClick</b> | <i>func</i> | *-* | Callback function for globe element clicks. The type of layer, the associated data object (if exists) and the event object are included as arguments: `onClick(layer, elementData, event)`. |
| <b>onHover</b> | <i>func</i> | *-* | Callback function for globe element mouse over events. The type of layer (or `undefined` if it's hovering off the globe) and the associated data object (if exists) are included as arguments: `onHover(layer, elementData)`. |

### Render Control

| Prop | Type | Default | Description |
| --- | :--: | :--: | --- |
| <b>rendererSize</b> | <i>Vector2</i> | Fallback to the full browser window size (`THREE.Vector2(window.innerWidth, window.innerHeight)`) | It's recommended to inject the current [renderer size](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.getSize) to ensure the object proportions remain constant. This is specially necessary when using path FatLines. |

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>pauseAnimation</b>| *-* | Pauses the animation on all globe layers. |
| <b>resumeAnimation</b>| *-* | Resumes the animation on all globe layers. |
| <b>setPointOfView</b> | (camera) | Some layers require knowledge about the location and view direction of the camera in order to behave correctly. Every time the camera position changes (f.e. on the controls `onChange` event) it's recommended to invoke this function, passing the current camera as sole argument, in order to keep the layers running optimally and synchronized with the view. |

### Utility

| Method | Arguments | Description |
| --- | :--: | --- |
| <b>getGlobeRadius</b> | *-* | Returns the cartesian distance of a globe radius in absolute spatial units. |
| <b>getCoords</b> | <i>lat</i>, <i>lng</i> [,<i>altitude</i>=`0`] | Utility method to translate spherical coordinates to cartesian. Given a pair of latitude/longitude coordinates and optionally altitude (in terms of globe radius units), returns the equivalent `{x, y, z}` cartesian spatial coordinates. |
| <b>toGeoCoords</b> | { <i>x</i>, <i>y</i>, <i>z</i> } | Utility method to translate cartesian coordinates to the geographic domain. Given a set of 3D cartesian coordinates `{x, y, z}`, returns the equivalent `{lat, lng, altitude}` spherical coordinates. Altitude is defined in terms of globe radius units. |


## Giving Back

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url) If this project has helped you and you'd like to contribute back, you can always [buy me a ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=L398E7PKP47E8&currency_code=USD&source=url)!

[npm-img]: https://img.shields.io/npm/v/r3f-globe
[npm-url]: https://npmjs.org/package/r3f-globe
[build-size-img]: https://img.shields.io/bundlephobia/minzip/r3f-globe
[build-size-url]: https://bundlephobia.com/result?p=r3f-globe
[npm-downloads-img]: https://img.shields.io/npm/dt/r3f-globe
[npm-downloads-url]: https://www.npmtrends.com/r3f-globe
