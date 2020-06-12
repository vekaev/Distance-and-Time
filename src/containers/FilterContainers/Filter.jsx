import React, { useState, useEffect } from 'react';
import ShipmentList from '../../components/FilterComponents/ShipmentList';
import InputList from '../../components/FilterComponents/InputList';
import styles from './Filter.module.scss';
import SpeedInputs from '../../components/FilterComponents/SpeedInputs';
import { connect } from 'react-redux';

import {
  speedChange,
  positionChange,
  shimpentChange,
} from '../../redux/actions/actions';

const Filter = ({
  submitForm,
  toggleBtnStatus,
  speed_value,
  speedChange,
  positionChange,
  shimpentChange,
}) => {
  const [btnActive, setBtnActive] = useState('sea');
  const [convertSpeedStatus, setConvertSpeedStatus] = useState(1);
  const [componentWillUpdate, setComponentWillUpdate] = useState(false);

  const handleSpeedChange = (value) => {
    speedChange({ speed_value: value });
  };

  const handlePositionChange = (value) => {
    console.log('change', value);
    positionChange(value);
  };

  const handleShimpentChange = (value) => {
    shimpentChange({ shipment_type: value });
  };

  useEffect(() => {
    if (componentWillUpdate) {
      switch (btnActive) {
        case 'sea':
          handleSpeedChange(13);
          handleShimpentChange('sea');
          break;
        case 'road':
          handleSpeedChange(35);
          handleShimpentChange('road');
          break;
        case 'air':
          handleSpeedChange(800);
          handleShimpentChange('air');
          break;
      }
      setConvertSpeedStatus(1.6093);
    }
  }, [btnActive]);

  return (
    <form onSubmit={submitForm} className={styles['filter']}>
      <div className={styles['filter__content']}>
        <ShipmentList
          toggleActive={setBtnActive}
          active={btnActive}
          setComponentWillUpdate={setComponentWillUpdate}
        />
        <InputList
          shipment={btnActive}
          setPositionPort={handlePositionChange}
          toggleBtnStatus={toggleBtnStatus}
        />

        <button
          type='submit'
          className={`
          ${styles[`${btnActive}`]}
          ${styles.submit__btn} 
          ${toggleBtnStatus ? styles.loading : ''}`}
        >
          {toggleBtnStatus ? <span className={styles.spinner}></span> : ''}
        </button>
      </div>

      <SpeedInputs
        convertSpeedStatus={convertSpeedStatus}
        setConvertSpeedStatus={setConvertSpeedStatus}
        speedValue={speed_value}
        btnActive={btnActive}
        handleSpeedChange={handleSpeedChange}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    speed_value: state.speed_value,
    shipment_type: state.shipment_type,
    road_speed_value: state.road_speed_value,
    lat_from: state.lat_from,
    lng_from: state.lng_from,
    lat_to: state.lat_to,
    lng_to: state.lng_to,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    speedChange: (value) => dispatch(speedChange(value)),
    positionChange: (value) => dispatch(positionChange(value)),
    shimpentChange: (value) => dispatch(shimpentChange(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
