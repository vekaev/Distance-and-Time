import React, { useState } from 'react';
import style from './SpeedInputs.module.scss';
// import {
//   speedIncrement,
//   speedDecrement,
//   speedChange,
// } from '../../store/actions';

import { connect } from 'react-redux';

const SpeedInputs = ({
  setSpeedValue,
  setConvertSpeedStatus,
  convertSpeedStatus,
  speedValue,
  btnActive,
  speed_value,
  speedChange,
  speedIncrement,
  speedDecrement,
}) => {
  // const changeSpeed = (status) => {
  //     if (speedValue > 1 || (status).toString() == "1") {
  //         setSpeedValue(+speedValue + status)
  //     }
  // }

  const handleChange = (value) => {
    setSpeedValue(value);
    speedChange({ speed_value: value });
  };

  return (
    <div className={style['filter__additional']}>
      <div className={style['speed__input']}>
        <label className={style.speed_label} htmlFor='speed'>
          average speed
          <input
            min={1}
            type='number'
            name='speed'
            value={speed_value}
            id='speed'
            onChange={(e) => handleChange(e.target.value)}
          />
        </label>
        <div className={style['arrow__part']}>
          <span
            onClick={() => speedIncrement({ speed_value: ++speed_value })}
            className={`${style.arrow} ${style.up}`}
          ></span>
          <span
            onClick={() => speedDecrement({ speed_value: --speed_value })}
            className={`${style.arrow} ${style.down}`}
          ></span>
        </div>
      </div>

      <div
        className={`${style.speed__select} ${
          btnActive == 'sea' ? style.sea__select : ''
        }`}
      >
        <select
          value={convertSpeedStatus}
          onChange={(e) => {
            setConvertSpeedStatus(+e.target.value);
            setSpeedValue(Math.round(speedValue * +e.target.value));
          }}
        >
          {btnActive == 'sea' ? (
            <option value={1}>Knots</option>
          ) : (
            <>
              <option value={1.6093}>Km/H</option>
              <option value={0.6214}>Mp/H</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    speed_value: state.speed_value,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    speedChange: (value) => dispatch(speedChange(value)),
    speedIncrement: (value) => dispatch(speedIncrement(value)),
    speedDecrement: (value) => dispatch(speedDecrement(value)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(SpeedInputs);
export default SpeedInputs;
