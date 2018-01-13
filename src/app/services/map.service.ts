import { Injectable } from '@angular/core';
import { AppSettings } from '../app-settings';
import { MapStateService } from './map-state.service';
import * as mapboxgl from 'mapbox-gl';
import * as polyline from '@mapbox/polyline';
import * as _ from 'lodash';
import * as turf from '@turf/turf';
import { GeoJSONSource } from 'mapbox-gl/dist/mapbox-gl';

@Injectable()
export class MapService {

  private _map: mapboxgl.Map;
  private _closeZoomStop = 10;
  private _layerNames: string[] = [];

  constructor(private _mapStateService: MapStateService) { 
    
  }
  public get map(): mapboxgl.Map {
    return this._map;
  }

  public init() {
    (mapboxgl as any).accessToken = AppSettings.MAPBOX_ACCESS_TOKEN;

    let mapState = this._mapStateService.get();
    this._map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/bjorngotestrandprivate/cjc23pg6t0uq42sqvtlqsqt90',
        center: mapState.center,
        zoom: mapState.zoom,
        // pitch: mapState.pitch,
        // bearing: mapState.bearing,
        boxZoom: false,
        preserveDrawingBuffer: true,
        maxZoom: 19,
        minZoom: 7
      });

      this._map.on('moveend', () => {
        const mapBearing = this._map.getBearing();
        const center = this._map.getCenter();
        this._mapStateService.setCenter([center.lng, center.lat]);
        this._mapStateService.setZoom(this._map.getZoom());
        this._mapStateService.setPitch(this._map.getPitch());
        this._mapStateService.setBearing(mapBearing);
    });
  }

  public drawActivity(id: string, activity_polyline: string, title:string) {

    let polyline_coordinates = polyline.decode(activity_polyline);
    let coordinates = _.map(polyline_coordinates, (pc) => {
      return [pc[1], pc[0]];
    });

    var geojson: GeoJSON.FeatureCollection<any> = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates
        },
        properties: []
      }]
    };

    const layerId = `layer-${id}`,
            sourceId = `layer-${id}`;
    this._layerNames.push(layerId);

    const layerSource = (this._map.getSource(sourceId) as mapboxgl.GeoJSONSource);
    if (layerSource) {
      layerSource.setData(geojson);
    } else {
      const source = this._createGeoJsonSourceFromData(geojson);
      this._map.addSource(sourceId, source);
      const lineLayers = this._createLineLayer(sourceId, layerId, title, '#000');
      
      _.each(lineLayers, (lineLayer) => { this._map.addLayer(lineLayer); });
    }

    let otherLayers = _.filter(this._layerNames, (layerName) => {
      return layerName != layerId;
    })
    this._map.moveLayer(layerId+"border", layerId);
    
    _.each(otherLayers, (otherLayer) => {
      this._map.moveLayer(otherLayer, layerId+"border");
      this._map.moveLayer(otherLayer, layerId );
      
    });
    

    this.setOpacityOnLayers(otherLayers, 1);
    this.setColorOnLayers(otherLayers, '#111');

    this.setOpacityOnLayers([layerId], 1);
    this.setColorOnLayers([layerId], '#e33');
    this.fitBoundsOfFeatureCollection(geojson);
    
  }

  // do not include objectClass lift since this should be a static layer on the map
  private _createLineLayer(sourceId: string, layerId: string, text?: string, color?: string): mapboxgl.Layer[] {
    let layers: mapboxgl.Layer[] = [{
        'id': layerId + 'border',
        'type': 'line',
        'source': sourceId,
        interactive: false,
        'paint': {
            'line-width': 3,
            'line-color': '#fff',
            'line-gap-width': {
                'base': 1,
                'stops': [
                    [10, 3],
                    [15, 5],
                    [17, 8]
                ]
            }
        },
        metadata: {
            'name': 'path',
            'mapbox:filter': ['all', ['==', '$type', 'LineString'], ['!=', 'objectClass', 'lift']]
        },
        'layout': {
            'visibility': 'visible'
        },
        filter: ['all', ['==', '$type', 'LineString'], ['!=', 'objectClass', 'lift']]
    },
    {
        'id': layerId,
        'type': 'line',
        'source': sourceId,
        interactive: false,
        'paint': {
            'line-opacity': 1,
            'line-width': {
                'base': 1,
                'stops': [
                    [10, 3],
                    [15, 5],
                    [17, 8]
                ]
            },
            'line-color':
                {
                    'type': 'identity',
                    'property': 'color',
                    'default': color ? color : '#01B596'
                }
        },
        metadata: {
            'name': 'path',
            'mapbox:filter': ['all', ['==', '$type', 'LineString'], ['!=', 'objectClass', 'lift']]
        },
        'layout': {
            'visibility': 'visible'
        },
        filter: ['all', ['==', '$type', 'LineString'], ['!=', 'objectClass', 'lift']]
    }];

    if (text) {
      layers.push({
        id: layerId + 'text',
        type: 'symbol',
        source: sourceId,
        paint: {
            'text-color': '#333333',
            'text-halo-width': 4,
            'text-halo-color': 'rgba(255,255,255, 1.0)'
        },
        'minzoom': this._closeZoomStop,
        'metadata': {
            'mapbox:filter': ['all', ['==', '$type', 'LineString'], ['!=', 'objectClass', 'lift']]
        },
        layout: {
            'symbol-placement': 'line',
            'symbol-spacing': 500,
            'text-transform': 'uppercase',
            // 'text-field': '{title}',
            'text-field': text,
            'text-size': {
                'base': 1,
                stops: [
                    [12, 11],
                    [15, 14],
                    [19, 16]
                ]
            },
        },
        filter: ['all', ['==', '$type', 'LineString'], ['!=', 'objectClass', 'lift']]
    });
    }

    return layers;
  }
  
  // Private helper methods ------------------------------------------------------------------------------------------
  private _createGeoJsonSourceFromData(data: GeoJSON.FeatureCollection<any> | string): mapboxgl.GeoJSONSourceRaw {
    return {
        type: 'geojson',
        data: data
    };
  }

  public fitBoundsOfFeatureCollection(featureCollection: GeoJSON.FeatureCollection<any>): boolean {
    if (featureCollection.features.length === 0) {
        return false;
    }
    const bbox = _.flatten(this._map.getBounds().toArray());
    const mapPolygon = turf.bboxPolygon(bbox);

    const featureBbox = turf.bbox(featureCollection);
    const boundingBox = new mapboxgl.LngLatBounds(featureBbox);
    const boundingPolygon = turf.bboxPolygon(featureBbox);

    const isFeatureWithinViewport = turf.booleanContains(mapPolygon, boundingPolygon);

    // om zoom är mindre än 11, zooma in då eftersom det är för långt ut annars
    if (this._map.getZoom() < 11 || !isFeatureWithinViewport) {
        this._map.fitBounds(boundingBox, {
            padding: { top: 40, bottom: 40, left: 40, right: 40 },
            maxZoom: 14
        });
    }
    return true;
  }

  public setOpacityOnLayers(layerNames: string[], opacity: number) {
    _.each(layerNames, (layerName => {
        // get layer to determine opacity types
        const layer = this._map.getLayer(layerName);

        if (layer) {
            const defaultMetadata = layer.metadata;

            if (!defaultMetadata || !defaultMetadata['mapbox:doNotFilter']) {
                let paintProperties = [];
                switch (layer.type) {
                    case 'fill':
                        paintProperties.push('fill-opacity');
                        break;
                    case 'line':
                        paintProperties.push('line-opacity');
                        break;
                    case 'circle':
                        paintProperties.push('circle-opacity');
                        break;
                    case 'symbol':
                        paintProperties.push('icon-opacity');
                        paintProperties.push('text-opacity');
                        break;
                }

                _.each(paintProperties, paintProperty => this._map.setPaintProperty(layerName, paintProperty, opacity));
            }
        }
    }));
  }

  public setColorOnLayers(layerNames: string[], color: string) {
    _.each(layerNames, (layerName => {
        // get layer to determine opacity types
        const layer = this._map.getLayer(layerName);

        if (layer) {
            const defaultMetadata = layer.metadata;

            if (!defaultMetadata || !defaultMetadata['mapbox:doNotFilter']) {
                let colorProperties = [];
                switch (layer.type) {
                    case 'fill':
                        // paintProperties.push('fill-opacity');
                        break;
                    case 'line':
                    colorProperties.push('line-color');
                        break;
                    case 'circle':
                        // paintProperties.push('circle-opacity');
                        break;
                    case 'symbol':
                        // paintProperties.push('icon-opacity');
                        // paintProperties.push('text-opacity');
                        break;
                }

                _.each(colorProperties, colorProperty => this._map.setPaintProperty(layerName, colorProperty, color));
            }
        }
    }));
  }

}
