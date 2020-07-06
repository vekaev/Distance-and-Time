import React from 'react';
import styles from './Switcher.module.scss';

export const Switcher = ({
  status,
  changeDisplayedInfoBlock,
  displayedInfoBlock,
}) => {
  return (
    <ul
      className={`${styles['switcher']} 
      ${styles[`${status}`]} 
      ${displayedInfoBlock == 'statistic' ? styles['switcher_left'] : ''} `}
    >
      <li
        onClick={() => {
          changeDisplayedInfoBlock('statistic'), window.scrollTo(0, 0);
        }}
        className={`${
          displayedInfoBlock == 'statistic' ? styles['active'] : ''
        }`}
      >
        Distances & time
      </li>
      <li
        onClick={() => {
          changeDisplayedInfoBlock('map'), window.scrollTo(0, 0);
        }}
        className={`${displayedInfoBlock == 'map' ? styles['active'] : ''}`}
      >
        Map
      </li>
    </ul>
  );
};
