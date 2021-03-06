import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Map from './containers/Map';
import styles from './App.module.scss';
import Filter from './containers/FilterContainers/Filter';
import Statistic from './containers/StatisticContainers/Statistic';
import { Switcher } from './components/StatisticComponents/Switcher';

const App = ({ responce_data, transportation_status }) => {
  const [displayedInfoBlock, changeDisplayedInfoBlock] = useState('duo');
  let windowWidth = window.matchMedia('(max-width: 768px)');

  useEffect(() => {
    windowWidthChecker(windowWidth);
    windowWidth.addListener(windowWidthChecker);
    return () => {
      windowWidth.removeListener(windowWidthChecker);
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
    <>
      <div id='distance__time-app' className={styles['main']}>
        <div className={styles['main_wrapper']}>
          <Filter responce_data={responce_data} />
          <Statistic
            displayedInfoBlock={displayedInfoBlock}
            // changeDisplayedInfoBlock={changeDisplayedInfoBlock}
            responce_data={responce_data}
            transportStatus={transportation_status}
          />
          <Map displayedInfoBlock={displayedInfoBlock} />
        </div>
        {responce_data &&
        responce_data.status !== 'error' &&
        displayedInfoBlock !== 'duo' ? (
          <Switcher
            status={transportation_status}
            displayedInfoBlock={displayedInfoBlock}
            changeDisplayedInfoBlock={changeDisplayedInfoBlock}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    responce_data: state.responce_data,
    transportation_status: state.transportation_status,
  };
};

export default React.memo(connect(mapStateToProps, null)(App));
