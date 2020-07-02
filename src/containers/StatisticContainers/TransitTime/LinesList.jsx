import React, { useEffect, useState } from 'react';
import styles from './LinesList.module.scss';
import { openInNewTab } from '../../../utils';

const listColors = [
  '#DEECFF',
  '#CFE4FF',
  '#C4DDFF',
  '#B7D6FF',
  '#ACD0FF',
  '#9FC9FF',
  '#94C2FF',
  '#89BCFF',
  '#7AB4FF',
  '#70AEFF',
  '#70AEFF',
  '#62A6FF',
  '#62A6FF',
  '#569FFF',
  '#569FFF',
  '#4C9AFF',
  '#4C9AFF',
  '#4C9AFF',
  '#3E92FF',
  '#3E92FF',
  '#3E92FF',
  '#338CFF',
  '#338CFF',
  '#338CFF',
  '#2784FF',
  '#2784FF',
  '#2784FF',
  '#1B7DFF',
  '#1B7DFF',
  '#1B7DFF',
  '#0E76FF',
  '#0E76FF',
  '#0E76FF',
  '#016FFF',
];

const LinesList = ({ data, getLineContainers, containers }) => {
  const [dataResponce, setDataResponce] = useState([]);

  useEffect(() => {
    setDataResponce([]);

    const setDataTime = setTimeout(() => {
      setDataResponce(data);
    }, 1);

    return () => clearTimeout(setDataTime);
  }, [data]);

  let maxValue = Math.ceil(data[data.length - 1].y / 10) * 10;

  if (
    containers &&
    containers.containersList !== undefined &&
    containers.containersList.length !== 0
  ) {
    let card = containers.mainLine,
      containerList = containers.containersList,
      maxContainerDeliveryTime = containers.containersList.length - 1;

    let maxValue =
      Math.ceil(containerList[maxContainerDeliveryTime][1] / 10) * 10;
    return (
      <>
        <ul className={`${styles['line__list']} ${styles['container__list']}`}>
          <li
            key={0}
            style={{
              width: `0%`,
              background: `${listColors[containers.styleIndex]}`,
              cursor: 'unset',
            }}
            className={`${styles['line']} ${styles['container']}`}
          >
            <span className={styles['line__title']}>{card.name}</span>

            <span className={styles['line__wrapper']}>
              <span
                className={styles['line__img']}
                style={{
                  borderColor: `${listColors[containers.styleIndex]}`,
                }}
              >
                <img
                  onError={(e) => {
                    e.target.src =
                      '/design/images/apps/dist-time/icon__sea-line.svg';
                  }}
                  className={styles['line__logo']}
                  alt={`${card.name.toLowerCase()} company logo`}
                  src={`https://www.searates.com/design/images/freight/sealine/${card.lineId}.jpg`}
                />
              </span>
            </span>

            {card.y ? (
              <p className={styles['line__time']}>
                {card.y} {card.y > 1 ? ' days' : ' day'}
              </p>
            ) : (
              <></>
            )}
          </li>
          {containerList.map((card, index, obj) => {
            if (card && card[0] && card[1]) {
              return (
                <li
                  key={index + 1}
                  onClick={() =>
                    openInNewTab(
                      `https://www.searates.com/container/tracking/?container=${card[0]}`,
                    )
                  }
                  style={{
                    width: `${(card[1] * 100) / maxValue}%`,
                    background: `${listColors[containers.styleIndex]}`,
                  }}
                  className={`${styles['line']} ${styles['container']}`}
                >
                  <span className={styles['line__title']}>{card[0]}</span>

                  <p className={styles['line__time']}>
                    {card[1]} {card[1] > 1 ? ' days' : ' day'}
                  </p>
                </li>
              );
            }
          })}
        </ul>
      </>
    );
  } else {
    return (
      <ul className={styles['line__list']}>
        {dataResponce.map((card, index, obj) => {
          if (card.name !== '') {
            return (
              <li
                key={index}
                onClick={() => getLineContainers(index)}
                style={{
                  width: `${(card.y * 100) / maxValue}%`,
                  background: `${
                    listColors[index]
                      ? listColors[index]
                      : listColors.length - 1
                  }`,
                }}
                className={`${styles['line']} `}
              >
                <span className={styles['line__title']}>{card.name}</span>

                <span className={styles['line__wrapper']}>
                  <span
                    className={styles['line__img']}
                    style={{
                      borderColor: `${
                        listColors[index]
                          ? listColors[index]
                          : listColors.length - 1
                      }`,
                    }}
                  >
                    <img
                      onError={(e) => {
                        e.target.src =
                          '/design/images/apps/dist-time/icon__sea-line.svg';
                      }}
                      className={styles['line__logo']}
                      alt={`${card.name.toLowerCase()} company logo`}
                      src={`https://www.searates.com/design/images/freight/sealine/${card.lineId}.jpg`}
                    />
                  </span>
                </span>

                {card.y ? (
                  <p className={styles['line__time']}>
                    {card.y} {card.y > 1 ? ' days' : ' day'}
                  </p>
                ) : (
                  <></>
                )}
              </li>
            );
          }
        })}
      </ul>
    );
  }
};

export default LinesList;
