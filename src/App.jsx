import React from 'react';
import Panel from './containers/Panel';
import { connect } from 'react-redux';
import { Map } from './containers/Map';
import styles from './App.module.scss';

const App = ({ responce_data, transportation_status }) => {
  console.log('app');
  return (
    <div className={styles['main_wrapper']}>
      <Panel
        data={responce_data}
        transportationStatus={transportation_status}
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
