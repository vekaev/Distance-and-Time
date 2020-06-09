import React, { useState } from 'react';
import style from './SpeedInputs.module.scss';

const SpeedInputs = ({
  speedValue,
  btnActive,
  handleSpeedChange,
  convertSpeedStatus,
  setConvertSpeedStatus,
}) => {
  // const changeSpeed = (status) => {
  //     if (speedValue > 1 || (status).toString() == "1") {
  //         setSpeedValue(+speedValue + status)
  //     }
  // }

  return (
    <div className={style['filter__additional']}>
      <div className={style['speed__input']}>
        <label className={style.speed_label} htmlFor='speed'>
          average speed
          <input
            min={1}
            type='number'
            name='speed'
            value={speedValue}
            id='speed'
            onChange={(e) => handleSpeedChange(e.target.value)}
          />
        </label>
        <div className={style['arrow__part']}>
          <span
            onClick={() => handleSpeedChange(++speedValue)}
            className={`${style.arrow} ${style.up}`}
          ></span>
          <span
            onClick={() => handleSpeedChange(--speedValue)}
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
            handleSpeedChange(Math.round(speedValue * +e.target.value));
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

export default SpeedInputs;
// export default SpeedInputs;
