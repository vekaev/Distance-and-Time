import React, { useState, useEffect } from 'react';
import styles from './TransitTime.module.scss';
import LinesList from './LinesList';

let numArray = [];
let firstRender = true;

export const TransitGraphic = ({ data }) => {
  console.log('TransitGraphic');
  const [containerData, setContainerList] = useState({});

  let lineList = data.transit_time_chart.drilldown.sort((a, b) =>
    a.y > b.y ? 1 : -1,
  );

  const setGraphicNumber = (value) => {
    numArray = [];
    const roundedValue = Math.ceil(value / 10) * 10;

    let splitNumber = 5;

    if (roundedValue <= 50) {
      splitNumber = 5;
    } else if (roundedValue > 50 && roundedValue <= 100) {
      splitNumber = 10;
    } else if (roundedValue > 100 && roundedValue <= 200) {
      splitNumber = 20;
    } else if (roundedValue > 200) {
      splitNumber = 50;
    }
    for (let i = 0; i <= roundedValue; i += splitNumber) {
      numArray.push(i);
    }
  };

  if (firstRender) {
    setGraphicNumber(lineList[lineList.length - 1].y);
    firstRender = false;
  }

  const getLineContainers = (index) => {
    if (index == 'back') {
      setContainerList(null);
      setGraphicNumber(lineList[lineList.length - 1].y);
    } else {
      let sortedContainerList = lineList[index].data.sort((a, b) =>
        a[1] > b[1] ? 1 : -1,
      );

      setContainerList({
        mainLine: lineList[index],
        containersList: lineList[index].length !== 0 ? sortedContainerList : [],
        styleIndex: index,
      });

      setGraphicNumber(sortedContainerList[sortedContainerList.length - 1][1]);
    }
  };

  return (
    <>
      <div className={styles['title__wrapper']}>
        <span className={styles['main__title']}>Transit Time</span>

        {containerData &&
        containerData.containersList !== undefined &&
        containerData.containersList.length !== 0 ? (
          <span
            className={styles['btn__back']}
            onClick={() => getLineContainers('back')}
          >
            Back
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className={styles['graphic']}>
        <LinesList
          data={lineList}
          getLineContainers={getLineContainers}
          containers={containerData}
          setGraphicNumber={setGraphicNumber}
        />
        <div className={styles['numbers']}>
          <p className={styles['numbers__title']}>Days</p>
          <ul className={styles['numbers__list']}>
            {numArray.map((number, index) => {
              return <li key={index}>{number}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
