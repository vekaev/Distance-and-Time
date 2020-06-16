import React, { useState } from 'react';
import TransitTime from './TransitTime';
import DistanceTime from './DistanceTime';

import AnimatedPrompt from '../components/StatisticComponents/AnimatedPrompt';

const Statistic = ({ responseData }) => {
  const [responseDataStatus, setResponseDataStatus] = useState('no-data');
  console.log(responseData);
  return (
    <>
      {responseDataStatus === 'no-data' ||
      responseDataStatus === 'error' ||
      responseDataStatus === undefined ? (
        <AnimatedPrompt state={responseDataStatus} />
      ) : (
        <>
          <TransitTime data={responseData} />
          <DistanceTime
            setResponseDataStatus={setResponseDataStatus}
            data={responseData}
          />
        </>
      )}
    </>
  );
};

export default Statistic;
