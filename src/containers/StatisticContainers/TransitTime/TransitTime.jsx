import React, { useState } from 'react';
import styles from './TransitTime.module.scss';
import { testResponce } from '../array';

import LinesList from './LinesList';

const TransitTime = ({ data }) => {
  let lineList = testResponce.transit_time_chart.drilldown;
  const [activeList, setActiveList] = useState('');
  const [containerArray, setContainerArray] = useState([testResponce]);

  return (
    <>
      {data &&
      data.transit_time_chart &&
      data.transit_time_chart.drilldown &&
      data.transit_time_chart.drilldown.length !== 0 ? (
        <div className={styles['no-transit-data']}>
          <span className={styles['img__part']}></span>
          <p>NO STATISTICS</p>
        </div>
      ) : (
        <>
          <div className={styles['graphic']}>
            <h2>Transit Time</h2>
            <LinesList data={lineList} />

            {/*<ContainerList/>*/}
            <div>
              <p>Days</p>
              <ul className={styles['number-list']}>
                <li className='number'>0</li>
                <li className='number'>10</li>
                <li className='number'>20</li>
                <li className='number'>30</li>
                <li className='number'>40</li>
                <li className='number'>50</li>
                <li className='number'>60</li>
                <li className='number'>70</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TransitTime;
