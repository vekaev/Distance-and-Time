import React, { useState } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './Statistic';
import './Panel.scss';

const Panel = ({
  submitForm,
  toggleBtnStatus,
  statisticDataStatus,
  distAndTimeDataStatus,
  responseData,
  setPositionPort,
}) => {
  return (
    <aside className='panel'>
      <Filter
        toggleBtnStatus={toggleBtnStatus}
        submitForm={submitForm}
        setPositionPort={setPositionPort}
      />
      <Statistic
        distAndTime={distAndTimeDataStatus}
        transitTime={statisticDataStatus}
        responseData={responseData}
      />
    </aside>
  );
};

export default Panel;
