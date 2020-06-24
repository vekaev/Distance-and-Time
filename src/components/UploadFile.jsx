import React, { useState } from 'react';
import axios from 'axios';
import styles from './UploadFile.module.scss';

export const UploadFile = () => {
  const [btnStatus, setBtnStatus] = useState('no-data');

  const fileUpload = (event) => {
    let file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    setBtnStatus('loading');
    setTimeout(() => {
      setBtnStatus('error');
    }, 2000);
    // axios
    //   .post('exemple', formData, config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const renderSwitch = (status, type) => {
    if (type === 'class') {
      switch (status) {
        case 'no-data':
          return 'loading';
        default:
          return 'error';
      }
    }
    if (type === 'text') {
      switch (status) {
        case 'no-data':
          return 'Upload Excel Sheet for land distance calculation';
        case 'loading':
          return 'Please wait...';
        case 'error':
          return 'ERROR Incorrect file';
      }
    }
  };

  return (
    <div>
      <span className={styles['prompt__icon']}></span>
      <label className={styles['upload__lablel']} htmlFor='file__input'>
        <span>{renderSwitch(btnStatus, 'text')}</span>
        <div className={styles['input__wrapper']}>
          <input
            type='file'
            id='file__input'
            onChange={fileUpload}
            className={` ${styles['uploadBtn']} 
        ${styles[`${renderSwitch(btnStatus, 'class')}`]}`}
          />
          {btnStatus === 'loading' ? (
            <span className={styles['spinner']}></span>
          ) : (
            ''
          )}
        </div>
      </label>
      <div className={styles['prompt']}></div>
    </div>
  );
};
