import React from 'react';

import Filter from './FilterContainers/Filter';
import Statistic from './StatisticContainers/Statistic';

import styles from './Panel.module.scss';

const Panel = ({ data, transportationStatus }) => {
  console.log('panel');
  return (
    <aside className={styles['panel']}>
      <Filter responce_data={data} />
      <Statistic responce_data={data} transportStatus={transportationStatus} />
    </aside>
  );
};

export default React.memo(Panel);
