import React, { useState } from 'react';
import style from './TransitTime.module.scss';

const TransitTime = ({ state, data }) => {
  console.log(data);

  return (
    <>
      {state === 'submit' ? (
        'DATA'
      ) : (
        <div className={style.no - transit - data}>
          <span className={style.img__part}></span>
          <p>NO STATISTICS</p>
        </div>
      )}
    </>
  );
};

export default TransitTime;
