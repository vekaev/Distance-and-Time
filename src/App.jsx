import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Map } from './containers/Map';
import styles from './App.module.scss';
import Filter from './containers/FilterContainers/Filter';
import Statistic from './containers/StatisticContainers/Statistic';

const App = ({ responce_data, transportation_status }) => {
  const [isShowMap, toggleShowMap] = useState(true);

  console.log('app');
  return (
    <div className={styles['main_wrapper']}>
      <Filter responce_data={responce_data} />
      <Statistic
        toggleShowMap={toggleShowMap}
        responce_data={responce_data}
        transportStatus={transportation_status}
      />
      <Map />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    responce_data: state.responce_data,
    transportation_status: state.transportation_status,
  };
};

export default React.memo(connect(mapStateToProps, null)(App));
