import React, { useState, useEffect } from 'react';
import TransitTime from './TransitTime';
import DistanceTime from './DistanceTime';

import AnimatedPrompt from '../../components/StatisticComponents/AnimatedPrompt';
import { connect } from 'react-redux';

const Statistic = ({ responce_data }) => {
  return (
    <>
      {!responce_data || responce_data.status == 'error' ? (
        <AnimatedPrompt state={responce_data.status} />
      ) : (
        <>
          <TransitTime data={responce_data} />
          <DistanceTime data={responce_data} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    responce_data: state.responce_data,
  };
};

export default connect(mapStateToProps, null)(Statistic);
