import React, { useEffect, useState } from 'react';
import styles from './LinesList.module.scss';

const listColors = [
  '#C1DAFE',
  '#B7D2FC',
  '#ACCBFA',
  '#A3C5F8',
  '#9ABFF6',
  '#90B8F4',
  '#86B1F3',
  '#7BAAF0',
  '#72A3EF',
  '#679CED',
  '#5C95EA',
  '#528EE9',
  '#4988E7',
  '#3E80E5',
  '#3E80E5',
  '#347AE3',
  '#347AE3',
  '#2A73E1',
  '#2A73E1',
  '#206CDF',
  '#206CDF',
  '#1766DD',
  '#1766DD',
  '#0B5EDB',
  '#0B5EDB',
  '#0B5EDB',
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

  data.sort((a, b) => (a.y > b.y ? 1 : -1));

  let maxValue = Math.ceil(data[data.length - 1].y / 10) * 10;

  // let getContainerList = (array, id) => {
  //   let containerList = array[id].data;
  //   // console.log(array[id].name, containerList);
  // };
  // for (let i = 0; i < data.length; i++) {
  //   getContainerList(data, i);
  // }

  // const handle
  //
  // const onMouseEnter = (index) => (event) => {
  //   const arr = Array.from(translate);
  //   arr[index] = ;
  //   setTranslate(arr);
  // };
  //
  // const onMouseLeave = (index) => () => {
  //   const arr = Array.from(translate);
  //   arr[index] = 0;
  //   setTranslate(arr);
  // };
  if (
    containers.containersList !== undefined &&
    containers.containersList.length !== 0
  ) {
    return <ul className={styles['line__list']}></ul>;
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
                  background: `${listColors[index]}`,
                }}
                className={`${styles['line']} ${
                  obj.length === 1 ? `${styles['alone']}` : ''
                }`}
              >
                <span className={styles['line__title']}>{card.name}</span>

                <span className={styles['line__wrapper']}>
                  <span
                    className={styles['line__img']}
                    style={{
                      borderColor: `${listColors[index]}`,
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
