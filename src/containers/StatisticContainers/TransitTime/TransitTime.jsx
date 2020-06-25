import React, { useState } from 'react';
import styles from './TransitTime.module.scss';
import { TransitGraphic } from './TransitGraphic';
import { connect } from 'react-redux';

const TransitTime = ({ data }) => {
  const isDataContains =
    data &&
    data.transit_time_chart &&
    data.transit_time_chart.drilldown &&
    data.transit_time_chart.drilldown.length !== 0;

  return (
    <>
      {isDataContains ? (
        <TransitGraphic data={data} />
      ) : (
        <div className={styles['no-transit-data']}>
          <span className={styles['img__part']}></span>
          <p>NO STATISTICS</p>
        </div>
      )}
    </>
  );
};

export default React.memo(TransitTime);
