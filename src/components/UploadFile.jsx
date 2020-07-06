import React, { useState } from 'react';
import axios from 'axios';
import styles from './UploadFile.module.scss';
import { openInNewTab } from '../utils/index.js';

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
      axios
        .post(
          'https://www.searates.com/services/load-excel-distances-time',
          formData,
          config,
        )
        .then((res) => {
          if (res.data && res.data.status && res.data.status == 'success') {
            openInNewTab(res.data.link);
            setBtnStatus('no-data');
          } else {
            setBtnStatus('error');
          }
        })
        .catch((error) => {
          setBtnStatus('error');
        });
    }, 1000);
  };

  const renderSwitch = (status, type) => {
    if (type === 'class') {
      switch (status) {
        case 'loading':
          return 'loading';
        case 'error':
          return 'error';
        default:
          return '';
      }
    }
    if (type === 'text') {
      switch (status) {
        case 'loading':
          return 'Please wait while data is loaded';
        case 'error':
          return 'Error. Try again, get help, or click on the website tips.';
        default:
          return 'Upload Excel Sheet for land distance calculation';
      }
    }
  };

  return (
    <div className={styles['upload__wrapper']}>
      <span
        className={`${styles['prompt__icon']} ${
          styles[`prompt__icon__${btnStatus}`]
        }`}
      ></span>
      <div className={styles['prompt']}>
        <b>The first 4 columns of your file should be headed:</b>
        <p>
          Country from
          <br />
          City from
          <br />
          Country to
          <br />
          City to
          <br />
          <br />
          You can also download the template to use it for filling cities and
          avoid any mistake
          <br />
          <br />
          You can also download the template to use it for filling cities and
          avoid any mistake
          <br />
          <br />
          The file must be in Excel format. Once you upload the file, wait for
          some time depending on the size of your file, and your browser will
          download the table with filled distances
          <br />
        </p>
        <a
          href='https://searates.com/downloads/Template_Road_Distance.xls'
          target='_blank'
        >
          Download template
        </a>
      </div>
      <span className={styles['input__text']}>
        {renderSwitch(btnStatus, 'text')}
      </span>
      <label className={styles['upload__lablel']} htmlFor='file__input'>
        <div
          className={` ${styles['input__wrapper']} ${
            styles[`${renderSwitch(btnStatus, 'class')}`]
          } `}
        >
          <input
            type='file'
            id='file__input'
            onChange={fileUpload}
            className={styles['uploadBtn']}
          />
          {btnStatus === 'loading' ? (
            <span className={styles['spinner']}></span>
          ) : (
            ''
          )}
        </div>
      </label>
    </div>
  );
};
