import React, { useState } from 'react';
import TransitTime from './TransitTime';
import DistanceTime from './DistanceTime';

import AnimatedPrompt from '../components/StatisticComponents/AnimatedPrompt';

const Statistic = ({ responseData }) => {
  return (
    <>
      <TransitTime data={responseData} />
      <DistanceTime data={responseData} />
    </>
  );
};

export default Statistic;
