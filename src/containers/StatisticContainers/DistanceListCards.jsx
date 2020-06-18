import React, { useState, useEffect } from 'react';
import styles from './DistanceTime.module.scss';
import { calcDist, calcSpeed, transfSeconds } from '../../utils';

const DistanceListCards = ({ data }) => {
  const [dataResponce, setDataResponce] = useState([]);

  useEffect(() => {
    setDataResponce([]);

    const setDataTime = setTimeout(() => {
      setDataResponce(createDataArray(data));
    }, 1);

    return () => clearTimeout(setDataTime);
  }, [data]);

  const createDataArray = () => {
    let distData = [];
    if (data) {
      if (data.status == 'sea' || data.status == 'air') {
        distData = [
          {
            name: data.road_from.name,
            distance: data.road_from.distance,
            tr_time: data.road_from.transit_time_seconds,
            av_speed: calcSpeed(data.road_from.speed),
          },
          {
            name: data[data.status].from_name,
            distance: data[data.status].dist,
            tr_time: data[data.status].transit_time_seconds,
            av_speed: data[data.status].speed,
          },
          {
            name: data[data.status].to_name,
            distance: data.road_to.distance,
            tr_time: data.road_to.transit_time_seconds,
            av_speed: calcSpeed(data.road_to.speed),
          },
          {
            name: data.road_to.name,
          },
        ];
      } else {
        distData = [
          {
            name: data.road.from_name,
            distance: data.road.distance,
            tr_time: data.road.transit_time_seconds,
            av_speed: calcSpeed(data.road.speed),
          },
          {
            name: data.road.to_name,
          },
        ];
      }
    }

    return distData;
  };

  dataResponce.map((item, i) => {
    let dist = calcDist(item.distance);
    let time = transfSeconds(item.tr_time);
    let distArray = [...dataResponce];
    if (item.distance !== undefined) {
      distArray[i].distance = dist;
    }
    if (item.tr_time !== undefined) {
      distArray[i].tr_time = time;
    }
  });

  return (
    <>
      <ul className={`${styles['distance-calculation']}`}>
        {dataResponce.length !== 0 &&
          dataResponce.map((card, index, obj) => {
            return (
              <li
                key={index}
                className={`${styles['card']} ${
                  obj.length === 1 ? `${styles['alone']}` : ''
                }`}
              >
                <span className={styles['card__title']}>{card.name}</span>
                {card.distance ? (
                  <p className={styles['info']}>{card.distance}</p>
                ) : (
                  <></>
                )}
                {card.tr_time ? (
                  <p className={styles['info']}>
                    Transit Time: <span>{card.tr_time} </span>
                  </p>
                ) : (
                  <></>
                )}
                {card.av_speed && (
                  <p className={styles['info']}>
                    Average Speed: <span>{card.av_speed}</span>
                  </p>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default DistanceListCards;
