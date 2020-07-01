import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Map from './containers/Map';
import styles from './App.module.scss';
import Filter from './containers/FilterContainers/Filter';
import Statistic from './containers/StatisticContainers/Statistic';

const App = ({ responce_data, transportation_status }) => {
  const [displayedInfoBlock, changeDisplayedInfoBlock] = useState('duo');

  useEffect(() => {
    let windowWidth = window.matchMedia('(max-width: 768px)');
    windowWidthChecker(windowWidth);
    windowWidth.addEventListener('change', windowWidthChecker);
    return () => {
      windowWidth.removeEventListener('change', windowWidthChecker);
    };
  }, [displayedInfoBlock]);

  function windowWidthChecker(width) {
    if (displayedInfoBlock === 'duo' && width.matches) {
      changeDisplayedInfoBlock('statistic');
    } else if (displayedInfoBlock !== 'duo' && !width.matches) {
      changeDisplayedInfoBlock('duo');
    }
  }

  return (
    <div className={styles['main_wrapper']}>
      <Filter responce_data={responce_data} />
      <Statistic
        displayedInfoBlock={displayedInfoBlock}
        changeDisplayedInfoBlock={changeDisplayedInfoBlock}
        responce_data={responce_data}
        transportStatus={transportation_status}
      />
      <Map displayedInfoBlock={displayedInfoBlock} />
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
