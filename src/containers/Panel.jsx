import React, { useState, useEffect } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './Statistic';
import styles from './Panel.module.scss';
import AnimatedPrompt from '../components/StatisticComponents/AnimatedPrompt';

const Panel = ({ submitForm, toggleBtnStatus, responseData }) => {
  const [responseDataStatus, setResponseDataStatus] = useState('no-data');
  useEffect(() => {
    if (responseData) {
      if (Object.keys(responseData).includes('response')) {
        setResponseDataStatus('error');
        console.log('error', responseDataStatus);
      } else {
        setResponseDataStatus('correct-data');
      }
    }
  }, [responseData]);

  return (
    <aside className={styles['panel']}>
      <Filter toggleBtnStatus={toggleBtnStatus} submitForm={submitForm} />
      {responseDataStatus === 'no-data' || responseDataStatus === 'error' ? (
        <AnimatedPrompt state={responseDataStatus} />
      ) : (
        <Statistic responseData={responseData} />
      )}
    </aside>
  );
};

export default Panel;
