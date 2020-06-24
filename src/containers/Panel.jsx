import React, { useState, useEffect } from 'react';
import Filter from './FilterContainers/Filter';
import Statistic from './StatisticContainers/Statistic';
import styles from './Panel.module.scss';
import { UploadFile } from '../components/UploadFile';

const Panel = ({ data }) => {
  const [uploadFileVisibility, setUploadFileVisibility] = useState('sea');
  return (
    <aside className={styles['panel']}>
      <Filter
        setUploadFileVisibility={setUploadFileVisibility}
        responce_data={data}
      />
      <Statistic />
      {(data == false && uploadFileVisibility === 'road') ||
      data.status == 'error' ? (
        <UploadFile />
      ) : (
        ''
      )}
    </aside>
  );
};

export default Panel;
