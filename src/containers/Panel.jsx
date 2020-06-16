import React, { useState, useEffect } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './Statistic';
import styles from './Panel.module.scss';

const Panel = ({ responseData }) => {
  return (
    <aside className={styles['panel']}>
      <Filter />
      <Statistic />
    </aside>
  );
};

export default Panel;
