import React, { useState } from 'react';
import styles from './ShipmentBtn.module.scss';

const ShipmentBtn = ({ title, active, toggleActive, label }) => {
  return (
    <li
      onClick={() => {
        toggleActive(title);
      }}
      className={`${styles['btn']} ${styles[`${title}`]} ${
        active === title ? styles.active : ''
      }`}
    >
      <span className={styles['icon']}></span>
      <input
        type='radio'
        name='shipment'
        autoFocus={title === 'sea' ? true : false}
        value={title}
        checked={active === title}
        onChange={() => {}}
      />
      <label htmlFor={title}>{label}</label>
    </li>
  );
};

export default ShipmentBtn;
