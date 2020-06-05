import React, { useState, useEffect } from 'react';
import ShipmentList from '../../components/FilterComponents/ShipmentList';
import InputList from './InputList';
import styles from './Filter.module.scss';
import SpeedInputs from './SpeedInputs';

const Filter = ({ submitForm, toggleBtnStatus, setPositionPort }) => {
  const [btnActive, setBtnActive] = useState('sea');
  const [speedValue, setSpeedValue] = useState(13);
  const [convertSpeedStatus, setConvertSpeedStatus] = useState(1);

  useEffect(() => {
    switch (btnActive) {
      case 'sea':
        setSpeedValue(13);
        break;
      case 'land':
        setSpeedValue(35);
        break;
      case 'air':
        setSpeedValue(800);
        break;
    }
    setConvertSpeedStatus(1.6093);
  }, [btnActive]);

  return (
    <form onSubmit={submitForm} className={styles['filter']}>
      <div className={styles['filter__content']}>
        <ShipmentList toggleActive={setBtnActive} active={btnActive} />

        <InputList
          setPositionPort={setPositionPort}
          toggleBtnStatus={toggleBtnStatus}
        />

        <button
          type='submit'
          className={`${styles.submit__btn} ${
            toggleBtnStatus ? styles.loading : ''
          }`}
        >
          {toggleBtnStatus ? <span className={styles.spinner}></span> : ''}
        </button>
      </div>

      <SpeedInputs
        convertSpeedStatus={convertSpeedStatus}
        setConvertSpeedStatus={setConvertSpeedStatus}
        speedValue={speedValue}
        setSpeedValue={setSpeedValue}
        btnActive={btnActive}
      />
    </form>
  );
};

export default Filter;
