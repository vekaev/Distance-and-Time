import React, { useState } from 'react';
import styles from './TransitTime.module.scss';
import { testResponce } from '../array';

import { TransitGraphic } from './TransitGraphic';

const TransitTime = ({ data }) => {
  const isDataContains =
    data &&
    data.transit_time_chart &&
    data.transit_time_chart.drilldown &&
    data.transit_time_chart.drilldown.length !== 0;

  return (
    <>
      {!isDataContains ? (
        <TransitGraphic data={testResponce} />
      ) : (
        <div className={styles['no-transit-data']}>
          <span className={styles['img__part']}></span>
          <p>NO STATISTICS</p>
        </div>
      )}
    </>
  );
};

export default TransitTime;
