import React, { useState } from 'react';
import './ShipmentBtn.scss';

const ShipmentBtn = ({ title, active, toggleActive }) => {
  return (
    <li
      onClick={() => toggleActive(title)}
      className={`btn ${title} ${active === title ? 'active' : ''}`}
    >
      <span className='icon'></span>
      <input
        type='radio'
        name='shipment'
        autoFocus={title === 'sea' ? true : false}
        value={title}
        checked={active === title ? true : false}
        onChange={() => {}}
      />
      <label htmlFor={title}>{title}</label>
    </li>
  );
};

export default ShipmentBtn;
