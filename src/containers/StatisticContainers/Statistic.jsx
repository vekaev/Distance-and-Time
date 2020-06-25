import React, { useState, useEffect } from 'react';
import TransitTime from './TransitTime/TransitTime';
import DistanceTime from './DistanceTime';

import AnimatedPrompt from '../../components/StatisticComponents/AnimatedPrompt';
import { UploadFile } from '../../components/UploadFile';

const Statistic = ({ responce_data, transportStatus }) => {
  console.log('statistic');
  return (
    <>
      {!responce_data || responce_data.status == 'error' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 140px)',
          }}
        >
          <AnimatedPrompt
            transportStatus={transportStatus}
            state={responce_data.status}
          />
          {transportStatus === 'road' ? <UploadFile /> : ''}
        </div>
      ) : (
        <>
          <TransitTime data={responce_data} />
          <DistanceTime data={responce_data} />
        </>
      )}
    </>
  );
};

export default React.memo(Statistic);
