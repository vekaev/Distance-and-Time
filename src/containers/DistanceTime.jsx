import React, { useState, useEffect } from 'react';
import styles from './DistanceTime.module.scss';
import { connect } from 'react-redux';

const transfSeconds = (sec) => {
  if (isNaN(sec) === true) {
    return 'Not correct data';
  }

  let d = Math.floor(+sec / (3600 * 24)),
    h = Math.floor((+sec % (3600 * 24)) / 3600);

  let dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '',
    hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';

  if (d == 0 && h <= 2) {
    return 'an hour';
  } else {
    return dDisplay + hDisplay;
  }
};
const calcDist = (km) => {
  const fromKmToMiles = 0.539957;
  if (isNaN(km) === true) {
    return 'Not correct data';
  }
  let miles = Math.round(km * fromKmToMiles * 100) / 100;

  let kmDisplay = km + ' km',
    mDisplay = miles + ' mi,';

  return `${mDisplay} (${kmDisplay})`;
};
const calcSpeed = (km) => {
  let corKm = parseFloat(km);
  const fromKmToMiles = 0.6214;
  if (isNaN(corKm) === true) {
    return 'Not correct data';
  }
  let miles = Math.round(corKm * fromKmToMiles * 100) / 100;

  return `${miles} mp/h (${km})`;
};

const DistanceTime = ({ data }) => {
  let distData = [];
  console.log(data, data.status);

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

  distData.map((item, i) => {
    let dist = calcDist(item.distance);
    let time = transfSeconds(item.tr_time);
    let distArray = [...distData];
    if (item.distance !== undefined) {
      distArray[i].distance = dist;
    }
    if (item.tr_time !== undefined) {
      distArray[i].tr_time = time;
    }
  });

  // }

  const DistanceList = distData.map((card, index, obj) => {
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
  });

  return (
    <>
      <div
        className={`${styles['distance-data']}  ${
          styles[`distance-data__${data.status}`]
        }`}
      >
        <h2 className={styles['title']}>Distances & Time</h2>

        <ul className={styles['distance-calculation']}>{DistanceList}</ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    shimpentType: state.shimpentType,
  };
};

export default connect(mapStateToProps, null)(DistanceTime);
