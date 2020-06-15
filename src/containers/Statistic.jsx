import React, { useState } from 'react';
import TransitTime from './TransitTime';
import DistanceTime from './DistanceTime';

import AnimatedPrompt from '../components/StatisticComponents/AnimatedPrompt';

const Statistic = ({ responseData, setResponseDataStatus }) => {
  console.log(responseData);
  return (
    <>
      <TransitTime data={responseData} />
      <DistanceTime
        setResponseDataStatus={setResponseDataStatus}
        data={responseData}
      />
    </>
  );
};

export default Statistic;
