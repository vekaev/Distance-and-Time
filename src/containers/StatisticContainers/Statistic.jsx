import React, { useState, useEffect } from 'react';
import TransitTime from './TransitTime/TransitTime';
import DistanceTime from './DistanceTime';

import AnimatedPrompt from '../../components/StatisticComponents/AnimatedPrompt';
import { Switcher } from '../../components/StatisticComponents/Switcher';
import { UploadFile } from '../../components/UploadFile';

import styles from './Statistic.module.scss';

const Statistic = ({ responce_data, transportStatus, displayedInfoBlock }) => {
  return (
    <>
      <aside
        id='panel'
        className={`${styles['panel']} 
    ${
      styles[
        `${
          displayedInfoBlock !== 'duo' && displayedInfoBlock == 'map'
            ? 'hide'
            : ''
        }`
      ]
    }`}
      >
        {!responce_data || responce_data.status == 'error' ? (
          <div className={styles['panel__wrapper']}>
            <AnimatedPrompt
              transportStatus={transportStatus}
              state={responce_data.status}
            />
            {/*WHEN BACK END DEV WILL COMPLETE SHOULD TO REPAIR*/}
            {/*{transportStatus === 'road' ? <UploadFile /> : ''}*/}
          </div>
        ) : (
          <>
            <TransitTime data={responce_data} />
            <DistanceTime data={responce_data} />
          </>
        )}
      </aside>
    </>
  );
};

export default React.memo(Statistic);
