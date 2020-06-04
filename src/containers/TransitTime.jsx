import React, { useState } from 'react';
import './TransitTime.scss';

const TransitTime = ({ state, data }) => {
  console.log(data);

  return (
    <>
      {state === 'submit' ? (
        'DATA'
      ) : (
        <div className='no-transit-data'>
          <span className='img__part'></span>
          <p>NO STATISTICS</p>
        </div>
      )}
    </>
  );
};

export default TransitTime;
