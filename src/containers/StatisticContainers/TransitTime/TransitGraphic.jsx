import React, { useState } from 'react';
import styles from './TransitTime.module.scss';
import LinesList from './LinesList';

let numArray = [];
let containerList = [];

export const TransitGraphic = ({ data }) => {
  const [containerData, setContainerList] = useState({});
  //
  // useEffect(() => {
  //   setItems(props.items || []);
  // }, [props.items]);

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
  setGraphicNumber(lineList[lineList.length - 1].y);

  const getLineContainers = (index) => {
    setContainerList({
      mainLine: lineList[index],
      containersList: lineList[index].length !== 0 ? lineList[index].data : [],
      styleIndex: index,
    });
  };
  console.log(containerData);

  return (
    <>
      <span className={styles['main__title']}>Transit Time</span>
      <div className={styles['graphic']}>
        <LinesList
          data={lineList}
          getLineContainers={getLineContainers}
          containers={containerData}
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
