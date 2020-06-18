import React, { useState } from 'react';
import style from './TransitTime.module.scss';

const TransitTime = ({ data }) => {
  if (data && data.transit_time_chart && data.transit_time_chart.drilldown) {
    console.log(data, data.transit_time_chart.drilldown.length);
  }

  return (
    <>
      {data &&
      data.transit_time_chart &&
      data.transit_time_chart.drilldown &&
      data.transit_time_chart.drilldown.length !== 0 ? (
        <div className={style['no-transit-data']}>
          <span className={style['img__part']}></span>
          <p>GET STATISTICS</p>
        </div>
      ) : (
        <div className={style['no-transit-data']}>
          <span className={style['img__part']}></span>
          <p>NO STATISTICS</p>
        </div>
      )}
    </>
  );
};

export default TransitTime;
