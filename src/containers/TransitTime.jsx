import React, { useState } from 'react';
import style from './TransitTime.module.scss';

const TransitTime = ({ data }) => {
  return (
    <>
      {data === 'submit' ? (
        'DATA'
      ) : (
        <div className={style['no-transit-data']}>
          <span className={style['img__part']}></span>
          <p>NO STATISTICS</p>
        </div>
      )}
    </>
  );
};

export default TransitTime;
