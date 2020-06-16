import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  shimpentChange,
  sendRequest,
  requestShimpentChange,
} from '../../redux/actions/actions';

import ShipmentList from '../../components/FilterComponents/ShipmentList';
import InputList from '../../components/FilterComponents/InputList';
import SpeedInputs from '../../components/FilterComponents/SpeedInputs';

import styles from './Filter.module.scss';

const Filter = ({
  shipment_type,
  request_data,
  shimpentChange,
  sendRequest,
  requestShimpentChange,
}) => {
  const [btnActive, setBtnActive] = useState('sea');
  const [convertSpeedStatus, setConvertSpeedStatus] = useState(1);
  const [componentWillUpdate, setComponentWillUpdate] = useState(false);
  const [loading, setSubmitButtonLoading] = useState(false);
  const [speedValue, setSpeedValue] = useState(13);

  const [requestData, setRequestData] = useState({
    params: {
      type: shipment_type,
      lat_from: 0,
      lng_from: 0,
      lat_to: 0,
      lng_to: 0,
      key: 'E1KN-9PFZ-BO20-PGMG',
    },
  });

  const handleShimpentChange = (value) => {
    shimpentChange({ shipment_type: value });
  };

  // AJAX REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(requestData);
    requestShimpentChange({ request_shipment_type: shipment_type });
    setSubmitButtonLoading(true);
  };
  useEffect(() => {
    setSubmitButtonLoading(false);
  }, [request_data]);
  // AJAX REQUEST

  useEffect(() => {
    if (componentWillUpdate) {
      switch (btnActive) {
        case 'sea':
          setSpeedValue(13);
          handleShimpentChange('sea');
          break;
        case 'road':
          setSpeedValue(35);
          handleShimpentChange('road');
          break;
        case 'air':
          setSpeedValue(800);
          handleShimpentChange('air');
          break;
      }
      setConvertSpeedStatus(1.6093);
    }
  }, [btnActive]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={styles['filter']}
    >
      <div className={styles['filter__content']}>
        <ShipmentList
          toggleActive={setBtnActive}
          active={btnActive}
          setComponentWillUpdate={setComponentWillUpdate}
        />
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
        shipmentType={shipment_type}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    shipment_type: state.shipment_type,
    request_data: state.request_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shimpentChange: (value) => dispatch(shimpentChange(value)),
    sendRequest: (value) => dispatch(sendRequest(value)),
    requestShimpentChange: (value) => dispatch(requestShimpentChange(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
