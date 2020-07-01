import React, { useState, useEffect } from 'react';
import styles from './Map.module.scss';
import mapInit from '../utils/map/initializeMap';
import { connect } from 'react-redux';
import './leaflet.scss';
let firstRender = true;
let map;

const Map = ({ responce_data, displayedInfoBlock }) => {
  useEffect(() => {
    if (firstRender) {
      map = mapInit('map');
      firstRender = false;
    }
    const status = responce_data.status;

    if (responce_data && status !== 'error') {
      let map_props;
      if (status == 'sea' || status == 'air') {
        map_props = {
          points: {
            inland_from: {
              lat: responce_data.road_from.lat,
              lng: responce_data.road_from.lng,
              name: responce_data.road_from.name,
              type: 'truck',
            },
            port_from: {
              type: 'sea-port',
              lat: responce_data[`${status == 'sea' ? 'sea' : 'air'}`].from_lat,
              lng: responce_data[`${status == 'sea' ? 'sea' : 'air'}`].from_lng,
              name:
                responce_data[`${status == 'sea' ? 'sea' : 'air'}`].from_name,
            },
            port_to: {
              type: 'sea-port',
              lat: responce_data[`${status == 'sea' ? 'sea' : 'air'}`].to_lat,
              lng: responce_data[`${status == 'sea' ? 'sea' : 'air'}`].to_lng,
              name: responce_data[`${status == 'sea' ? 'sea' : 'air'}`].to_name,
            },
            inland_to: {
              lat: responce_data.road_to.lat,
              lng: responce_data.road_to.lng,
              name: responce_data.road_to.name,
              type: 'truck',
            },
          },
          routes: {
            land_a: {
              type: 'truck',
              path: responce_data.road_from.path,
            },
            main: {
              type: `${status == 'sea' ? 'sea' : 'air'}`,
              path: responce_data[`${status == 'sea' ? 'sea' : 'air'}`].path,
            },
            land_b: {
              type: 'truck',
              path: responce_data.road_to.path,
            },
          },
          type: `${status == 'sea' ? 'FCL' : 'AIR'}`,
        };
      } else if (status === 'road') {
        map_props = {
          points: {
            inland_from: {
              lat: responce_data.road.from_lat,
              lng: responce_data.road.from_lng,
              name: responce_data.road.from_name,
              type: 'truck',
            },
            port_from: {
              type: 'sea-port',
              lat: undefined,
              lng: undefined,
              name: undefined,
            },
            port_to: {
              type: 'sea-port',
              lat: undefined,
              lng: undefined,
              name: undefined,
            },
            inland_to: {
              lat: responce_data.road.to_lat,
              lng: responce_data.road.to_lng,
              name: responce_data.road.to_name,
              type: 'truck',
            },
          },
          routes: {
            land_a: {
              type: 'truck',
              path: null,
            },
            main: {
              type: 'truck',
              path: responce_data.road.path,
            },
            land_b: {
              type: 'truck',
              path: null,
            },
          },
          type: 'LCL',
        };
      }

      const draw = (props, map) => {
        //clearMap
        map.clearMap();

        //Markers
        Object.keys(props.points).map(function (objectKey, index) {
          let value = props.points[objectKey];

          if (value.lat && value.lng) {
            if (!value.type) value.type = 'truck';
            map.drawMarker(value.type, [value.lat, value.lng], value.name);
            if (props.type === 'RAIL')
              map.drawCircle([value.lat, value.lng], 500, '#0028FF', '#0028FF');
          }
        });

        //Path
        Object.keys(props.routes).map(function (objectKey, index) {
          let value = props.routes[objectKey];

          if (value.path) {
            map.drawPath(value.type, value.path);
          }
        });

        //fit bounds
        map.fitMap();
      };

      draw(map_props, map);
    } else {
      map.clearMap();
    }
  }, [responce_data]);

  return (
    <div
      className={`
  ${styles['map_wrapper']}
  ${
    styles[
      `${
        displayedInfoBlock !== 'duo' && displayedInfoBlock == 'statistic'
          ? 'hide'
          : ''
      }`
    ]
  }`}
    >
      <div id='map'></div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    responce_data: state.responce_data,
  };
};

export default React.memo(connect(mapStateToProps, null)(Map));
