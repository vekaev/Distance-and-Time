import React from 'react';
import styles from './SubmitBtn.module.scss';

const SubmitBtn = ({ loading, transportation_status }) => {
  return (
    <button
      type='submit'
      className={`
          ${styles[`${transportation_status}`]}
          ${styles['submit__btn']} 
          ${loading ? styles['loading'] : ''}`}
    >
      <p className={styles['submit__btn-text']}>SEARCH</p>
      {loading ? <span className={styles['spinner']}></span> : ''}
    </button>
  );
};

export default React.memo(SubmitBtn);
