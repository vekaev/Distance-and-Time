import React, { useState } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './Statistic';
import styles from './Panel.module.scss';

const Panel = ({
  submitForm,
  toggleBtnStatus,
  statisticDataStatus,
  distAndTimeDataStatus,
  responseData,
}) => {
  return (
    <aside className={styles['panel']}>
      <Filter toggleBtnStatus={toggleBtnStatus} submitForm={submitForm} />
      <Statistic
        distAndTime={distAndTimeDataStatus}
        transitTime={statisticDataStatus}
        responseData={responseData}
      />
    </aside>
  );
};

export default Panel;
