import React, { useState } from 'react';
import styles from './LinesList.module.scss';

const LinesList = ({ data }) => {
  let getContainerList = (array, id) => {
    let containerList = array[id].data;
    console.log(array[id].name, containerList);
  };
  for (let i = 0; i < data.length; i++) {
    getContainerList(data, i);
  }

  return (
    <ul className={styles['line_list']}>
      {data.map((card, index, obj) => {
        return (
          <li
            key={index}
            className={`${styles['card']} ${
              obj.length === 1 ? `${styles['alone']}` : ''
            }`}
          >
            <span className={styles}></span>
            <span className={styles['card__title']}>{card.name}</span>
            {card.y ? <p className={styles['info']}>{card.y}</p> : <></>}
          </li>
        );
      })}
    </ul>
  );
};

export default LinesList;
