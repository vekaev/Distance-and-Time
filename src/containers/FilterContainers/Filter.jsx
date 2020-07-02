import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  sendRequest,
  setTransportationStatus,
} from '../../redux/actions/actions';

import ShipmentList from '../../components/FilterComponents/ShipmentList';
import InputList from '../../components/FilterComponents/InputList';
import SpeedInputs from '../../components/FilterComponents/SpeedInputs';

import styles from './Filter.module.scss';

const Filter = ({
  responce_data,
  sendRequest,
  setTransportationStatus,
  transportation_status,
}) => {
  const [convertSpeedStatus, setConvertSpeedStatus] = useState(1);
  const [loading, setSubmitButtonLoading] = useState(false);
  const [speedValue, setSpeedValue] = useState(13);
  const [requestData, setRequestData] = useState({
    params: {
      type: transportation_status || 'sea',
      speed: speedValue,
      lat_from: 0,
      lng_from: 0,
      lat_to: 0,
      lng_to: 0,
    },
  });

  const handleSetBtnActive = (value) => {
    setTransportationStatus({ transportation_status: value });
  };

  const convertSpeed = (speed) => {
    if (transportation_status !== 'sea' && convertSpeedStatus !== 1.6093) {
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
    switch (transportation_status) {
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
        type: transportation_status,
      },
    }));
  }, [transportation_status]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={styles['filter']}
    >
      <div className={styles['filter__content']}>
        <ShipmentList
          toggleActive={handleSetBtnActive}
          active={transportation_status}
        />
        <InputList
          shipment={transportation_status}
          setRequestData={setRequestData}
          toggleBtnStatus={loading}
        />

        <button
          type='submit'
          className={`
          ${styles[`${transportation_status}`]}
          ${styles.submit__btn} 
          ${loading ? styles.loading : ''}`}
        >
          <p className={styles['submit__btn-text']}>SEARCH</p>
          {loading ? <span className={styles.spinner}></span> : ''}
        </button>
      </div>

      <SpeedInputs
        convertSpeedStatus={convertSpeedStatus}
        setConvertSpeedStatus={setConvertSpeedStatus}
        speedValue={speedValue}
        btnActive={transportation_status}
        handleSpeedChange={setSpeedValue}
        shipmentType={transportation_status}
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendRequest: (value) => dispatch(sendRequest(value)),
    setTransportationStatus: (value) =>
      dispatch(setTransportationStatus(value)),
  };
};

const mapStateToProps = (state) => {
  return {
    responce_data: state.responce_data,
    transportation_status: state.transportation_status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
