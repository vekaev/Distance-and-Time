import React from 'react';
import styles from './AnimatedPrompt.module.scss';

const AnimatedPrompt = ({ state, transportStatus }) => {
  return (
    <div
      className={`${styles['animated__prompt']}  
                  ${styles[`${state}`]}
                  ${styles[`animated__prompt__${transportStatus}`]}`}
    >
      <div className={`${styles['search__animation']}`}>
        <div className={styles['center-part']}>
          <span className={styles['search']}></span>
          <span className={styles['location']}></span>
        </div>
        <span
          className={`${styles['particle']} ${styles['first__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['second__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['third__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['first__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['second__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['third__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['first__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['second__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['third__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['first__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['second__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['third__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['first__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['second__img']}`}
        ></span>
        <span
          className={`${styles['particle']} ${styles['third__img']}`}
        ></span>
      </div>
      <p>
        {state === 'error'
          ? 'Sorry, but nothing matched your search terms. Please return to amend your search criteria and try again.'
          : 'Select port (place) of origin and port (place) of destination, then time interval for your schedule and hit Search button.'}
      </p>
    </div>
  );
};

export default AnimatedPrompt;
