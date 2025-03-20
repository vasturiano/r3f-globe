import R3fGlobe from 'https://esm.sh/r3f-globe?external=three,react';
import { createElement, useMemo, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { csvParse, scaleSequentialSqrt, interpolateYlOrRd } from 'https://esm.sh/d3';
import * as topojson from 'https://esm.sh/topojson-client';

export const Points = ptProps => {
  const N = 300;
  const gData = useMemo(() => [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  })), [N]);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    bumpImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    pointsData: gData,
    pointAltitude: 'size',
    pointColor: 'color'
  });
}

export const Arcs = ptProps => {
  const N = 20;
  const gData = useMemo(() => [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  })), [N]);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    arcsData: gData,
    arcColor: 'color',
    arcDashLength: 0.4,
    arcDashGap: 4,
    arcDashInitialGap: () => Math.random() * 5,
    arcDashAnimateTime: 1000
  });
}

export const Paths = ptProps => {
  const N_PATHS = 10;
  const MAX_POINTS_PER_LINE = 10000;
  const MAX_STEP_DEG = 1;
  const MAX_STEP_ALT = 0.01;

  const gData = useMemo(() => [...Array(N_PATHS).keys()].map(() => {
    let lat = (Math.random() - 0.5) * 90;
    let lng = (Math.random() - 0.5) * 360;
    let alt = 0;

    return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
      lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
      lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
      alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
      alt = Math.max(0, alt);

      return [lat, lng, alt];
    })];
  }), []);

  return createElement(R3fGlobe, {
    ...ptProps,
    animateIn: false,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    bumpImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    pathsData: gData,
    pathPointAlt: pnt => pnt[2],
    pathColor: () => ['rgba(0,0,255,0.8)', 'rgba(255,0,0,0.8)'],
    pathDashLength: 0.01,
    pathDashGap: 0.004,
    pathDashAnimateTime: 100000
  });
}

export const CountryPolygons = ptProps => {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    fetch('./data/ne_110m_admin_0_countries.geojson')
      .then(r =>r.json())
      .then(countries => setPolygons(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')));
  }, []);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    polygonsData: polygons,
    polygonCapColor: () => 'rgba(200, 0, 0, 0.7)',
    polygonSideColor: () => 'rgba(0, 200, 0, 0.1)',
    polygonStrokeColor: () => '#111'
  });
}

export const Hexbin = ptProps => {
  const N = 6000;
  const gData = useMemo(() => [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180 * 0.9,
    lng: (Math.random() - 0.5) * 360 / 1
  })), [N]);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    bumpImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    hexBinPointsData: gData,
    hexBinPointWeight: 3,
    hexBinResolution: 2,
    hexMargin: 0.2,
    hexTopColor: () => 'red',
    hexSideColor: () => 'rgba(0,255,0,0.8)',
    hexBinMerge: true
  });
}

export const HexedPolygons = ptProps => {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    fetch('./data/ne_110m_admin_0_countries.geojson')
      .then(r =>r.json())
      .then(countries => setPolygons(countries.features));
  }, []);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    hexPolygonsData: polygons,
    hexPolygonResolution: 3,
    hexPolygonMargin: 0.3,
    hexPolygonUseDots: true,
    hexPolygonColor: () => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`
  });
}

export const Heatmap = ptProps => {
  const N = 900;
  const gData = useMemo(() => [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 160,
    lng: (Math.random() - 0.5) * 360,
    weight: Math.random()
  })), [N]);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    heatmapsData:[gData],
    heatmapPointLat: 'lat',
    heatmapPointLng: 'lng',
    heatmapPointWeight: 'weight',
    heatmapTopAltitude: 0.7
  });
}

export const Population = ptProps => {
  const [popData, setPopData] = useState([]);

  useEffect(() => {
    // load data
    fetch('./data/world_population.csv').then(res => res.text())
      .then(csv => csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
      .then(setPopData);
  }, []);

  const weightColor = scaleSequentialSqrt(interpolateYlOrRd)
    .domain([0, 1e7]);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    bumpImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    backgroundImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png',

    hexBinPointsData: popData,
    hexBinPointWeight: 'pop',
    hexAltitude: d => d.sumWeight * 6e-8,
    hexBinResolution: 4,
    hexTopColor: d => weightColor(d.sumWeight),
    hexSideColor: d => weightColor(d.sumWeight),
    hexBinMerge: true
  });
}

export const Hollow = ptProps => {
  const [landPolygons, setLandPolygons] = useState([]);

  useEffect(() => {
    // load data
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  const polygonsMaterial = useMemo(() => new THREE.MeshLambertMaterial({ color: 'darkslategrey', side: THREE.DoubleSide }), []);

  return createElement(R3fGlobe, {
    ...ptProps,
    backgroundColor: 'rgba(0,0,0,0)',
    showGlobe: false,
    showAtmosphere: false,
    polygonsData: landPolygons,
    polygonCapMaterial: polygonsMaterial,
    polygonSideColor: () => 'rgba(0, 0, 0, 0)'
  });
}

export const Moon = ptProps => {
  const labelsTopOrientation = useMemo(() => new Set(['Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe'])); // avoid label collisions

  const [landingSites, setLandingSites] = useState([]);

  useEffect(() => {
    fetch('./data/moon_landings.json')
      .then(r =>r.json())
      .then(setLandingSites);
  }, []);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: './imgs/lunar_surface.jpg',
    bumpImageUrl: './imgs/lunar_bumpmap.jpg',
    showGraticules: true,
    labelsData: landingSites,
    labelText: 'label',
    labelSize: 1.7,
    labelDotRadius: 0.4,
    labelDotOrientation: d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom',
    labelColor: () => 'red'
  });
}

export const Tiles = ptProps => {
  const TILE_MARGIN = 0.35; // degrees

  // Gen random data
  const GRID_SIZE = useMemo(() => [60, 20], []);
  const COLORS = useMemo(() => ['red', 'green', 'yellow', 'blue', 'orange', 'pink', 'brown', 'purple', 'magenta'], []);

  const materials = useMemo(() => COLORS.map(color => new THREE.MeshLambertMaterial({ color, opacity: 0.6, transparent: true })), [COLORS]);
  const tileWidth = 360 / GRID_SIZE[0];
  const tileHeight = 180 / GRID_SIZE[1];
  const tilesData = useMemo(() => {
    const tilesData = [];
    [...Array(GRID_SIZE[0]).keys()].forEach(lngIdx =>
      [...Array(GRID_SIZE[1]).keys()].forEach(latIdx =>
        tilesData.push({
          lng: -180 + lngIdx * tileWidth,
          lat: -90 + (latIdx + 0.5) * tileHeight,
          material: materials[Math.floor(Math.random() * materials.length)]
        })
      )
    );
    return tilesData;
  }, [GRID_SIZE, tileWidth, tileHeight, materials]);

  return createElement(R3fGlobe, {
    ...ptProps,
    tilesData: tilesData,
    tileWidth: tileWidth - TILE_MARGIN,
    tileHeight: tileHeight - TILE_MARGIN,
    tileMaterial: 'material'
  });
}

export const Ripples = ptProps => {
  const N = 10;
  const gData = useMemo(() => [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    maxR: Math.random() * 20 + 3,
    propagationSpeed: (Math.random() - 0.5) * 20 + 1,
    repeatPeriod: Math.random() * 2000 + 200
  })), [N]);

  const colorInterpolator = useCallback(t => `rgba(255,100,50,${1-t})`, []);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    ringsData: gData,
    ringColor: () => colorInterpolator,
    ringMaxRadius: 'maxR',
    ringPropagationSpeed: 'propagationSpeed',
    ringRepeatPeriod: 'repeatPeriod'
  });
}

export const Shield = ptProps => {
  const shieldRing = useMemo(() => ({ lat: 90, lng: 0 }), []);

  return createElement(R3fGlobe, {
    ...ptProps,
    globeImageUrl: '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    ringsData: [shieldRing],
    ringAltitude: 0.25,
    ringColor: () => 'lightblue',
    ringMaxRadius: 180,
    ringPropagationSpeed: 20,
    ringRepeatPeriod: 200
  });
}

export default [HexedPolygons, Ripples, Paths, Points, Shield, CountryPolygons, Hollow, Hexbin, Tiles, Heatmap, Population, Arcs, Moon];
