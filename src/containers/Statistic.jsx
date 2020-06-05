import React, { useState } from 'react';
import TransitTime from './TransitTime';
import DistanceTime from './DistanceTime';
import style from './Statistic.module.scss';

const Statistic = ({ responseData }) => {
  const [responseDataStatus, setResponseDataStatus] = useState();

  return (
    <>
      {responseData == !'error' ? (
        <>
          <TransitTime data={responseData.transit_time_chart} />
          <DistanceTime data={responseData} />
        </>
      ) : (
        <div className={style['no-data']}>
          <div className={style['search__animation']}>
            <div className={style['center-part']}>
              <span className={style['search']}></span>
              <span className={style['location']}></span>
            </div>
            <span
              className={`${style['particle']} ${style['first__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['second__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['third__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['first__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['second__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['third__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['first__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['second__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['third__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['first__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['second__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['third__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['first__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['second__img']}`}
            ></span>
            <span
              className={`${style['particle']} ${style['third__img']}`}
            ></span>
          </div>
          <p>
            Select port (place) of origin and port (place) of destination, then
            time interval for your schedule and hit Search button.
          </p>
        </div>
      )}
    </>
  );
};

export default Statistic;
