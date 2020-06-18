import React, { useState, useEffect } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './StatisticContainers/Statistic';
import styles from './Panel.module.scss';

const Panel = () => {
  return (
    <aside className={styles['panel']}>
      <Filter />
      <Statistic />
    </aside>
  );
};

export default Panel;
