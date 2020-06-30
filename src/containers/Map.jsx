import React, { useEffect } from 'react';
import styles from './Map.module.scss';
import mapInit from '../utils/map/initializeMap';

export const Map = ({ displayedInfoBlock }) => {
  useEffect(() => {
    const map = mapInit('map');
    map.fitMap();
  }, []);

  return (
    <>
      <div
        id='map'
        className={`
  ${styles['map']}
  ${
    styles[
      `${
        displayedInfoBlock !== 'duo' && displayedInfoBlock == 'statistic'
          ? 'hide'
          : ''
      }`
    ]
  }`}
      ></div>
    </>
  );
};
