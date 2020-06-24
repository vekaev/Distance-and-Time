import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendRequest } from '../../redux/actions/actions';

import ShipmentList from '../../components/FilterComponents/ShipmentList';
import InputList from '../../components/FilterComponents/InputList';
import SpeedInputs from '../../components/FilterComponents/SpeedInputs';

import styles from './Filter.module.scss';

const Filter = ({ responce_data, sendRequest, setUploadFileVisibility }) => {
  const [btnActive, setBtnActive] = useState('sea');
  const [convertSpeedStatus, setConvertSpeedStatus] = useState(1);
  const [loading, setSubmitButtonLoading] = useState(false);
  const [speedValue, setSpeedValue] = useState(13);

  const handleSetBtnActive = (value) => {
    setUploadFileVisibility(value);
    setBtnActive(value);
  };

  const [requestData, setRequestData] = useState({
    params: {
      type: btnActive || 'sea',
      speed: speedValue,
      lat_from: 0,
      lng_from: 0,
      lat_to: 0,
      lng_to: 0,
      key: 'E1KN-9PFZ-BO20-PGMG',
    },
  });

  const convertSpeed = (speed) => {
    if (btnActive !== 'sea' && convertSpeedStatus !== 1.6093) {
      return Math.round(speed * 1.6093);
    } else {
      return speed;
    }
  };

  useEffect(() => {
    setRequestData((state) => ({
      params: {
        ...state.params,
        speed: convertSpeed(speedValue),
      },
    }));
  }, [speedValue]);

  // AJAX REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest(requestData);
    setSubmitButtonLoading(true);
  };

  useEffect(() => {
    setSubmitButtonLoading(false);
  }, [responce_data]);

  // AJAX REQUEST

  useEffect(() => {
    switch (btnActive) {
      case 'sea':
        setSpeedValue(13);
        break;
      case 'road':
        setSpeedValue(35);
        break;
      case 'air':
        setSpeedValue(800);
        break;
    }
    setConvertSpeedStatus(1.6093);
    setRequestData((state) => ({
      params: {
        ...state.params,
        type: btnActive,
      },
    }));
  }, [btnActive]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={styles['filter']}
    >
      <div className={styles['filter__content']}>
        <ShipmentList toggleActive={handleSetBtnActive} active={btnActive} />
        <InputList
          shipment={btnActive}
          setRequestData={setRequestData}
          toggleBtnStatus={loading}
        />

        <button
          type='submit'
          className={`
          ${styles[`${btnActive}`]}
          ${styles.submit__btn} 
          ${loading ? styles.loading : ''}`}
        >
          {loading ? <span className={styles.spinner}></span> : ''}
        </button>
      </div>

      <SpeedInputs
        convertSpeedStatus={convertSpeedStatus}
        setConvertSpeedStatus={setConvertSpeedStatus}
        speedValue={speedValue}
        btnActive={btnActive}
        handleSpeedChange={setSpeedValue}
        shipmentType={btnActive}
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendRequest: (value) => dispatch(sendRequest(value)),
  };
};

export default connect(null, mapDispatchToProps)(Filter);
