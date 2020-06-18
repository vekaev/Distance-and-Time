import React, { useState, useEffect } from 'react';
import styles from './DistanceTime.module.scss';
import DistanceListCards from './DistanceListCards';

const DistanceTime = ({ data }) => {
  return (
    <>
      <div
        className={`${styles['distance-data']}  ${
          styles[`distance-data__${data.status}`]
        }`}
      >
        <h2 className={styles['title']}>Distances & Time</h2>
        <DistanceListCards data={data} />
      </div>
    </>
  );
};

export default DistanceTime;
