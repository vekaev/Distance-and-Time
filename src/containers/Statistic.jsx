import React, { useState } from 'react';
import TransitTime from './TransitTime';
import DistanceTime from './DistanceTime';
import './Statistic.scss';

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
        <div className='no-data'>
          <div className='search__animation'>
            <div className='center-part'>
              <span className={`search ${'error'}`}></span>
              <span className={`location ${'error'}`}></span>
            </div>
            <span className='particle first__img'></span>
            <span className='particle second__img'></span>
            <span className='particle first__img'></span>
            <span className='particle second__img'></span>
            <span className='particle first__img'></span>
            <span className='particle second__img'></span>
            <span className='particle second__img'></span>
            <span className='particle second__img'></span>
            <span className='particle third__img'></span>
            <span className='particle first__img'></span>
            <span className='particle second__img'></span>
            <span className='particle third__img'></span>
            <span className='particle first__img'></span>
            <span className='particle first__img'></span>
            <span className='particle second__img'></span>
            <span className='particle third__img'></span>
            <span className='particle first__img'></span>
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
