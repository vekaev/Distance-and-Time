import React, { useState, useEffect } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './Statistic';
import styles from './Panel.module.scss';
import AnimatedPrompt from '../components/StatisticComponents/AnimatedPrompt';

const Panel = ({
  submitForm,
  toggleBtnStatus,
  responseData,
  responseDataStatus,
  setResponseDataStatus,
}) => {
  console.log(responseDataStatus);
  console.log(responseData);

  return (
    <aside className={styles['panel']}>
      <Filter toggleBtnStatus={toggleBtnStatus} submitForm={submitForm} />
      {responseDataStatus === 'no-data' || responseDataStatus === 'error' ? (
        <AnimatedPrompt state={responseDataStatus} />
      ) : (
        <Statistic
          responseData={responseData}
          setResponseDataStatus={setResponseDataStatus}
        />
      )}
    </aside>
  );
};

export default Panel;
