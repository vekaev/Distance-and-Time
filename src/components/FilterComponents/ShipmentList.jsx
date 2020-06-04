import React from 'react';
import ShipmentBtn from './ShipmentBtn';
import './ShipmentList.scss';

const ShipmentList = ({ toggleActive, active }) => {
  return (
    <div className='shipment__choose'>
      <span className='title'>transportation by</span>
      <ul className={`btn__list ${active}__list`}>
        <ShipmentBtn toggleActive={toggleActive} active={active} title='sea' />
        <ShipmentBtn toggleActive={toggleActive} active={active} title='land' />
        <ShipmentBtn toggleActive={toggleActive} active={active} title='air' />
      </ul>
    </div>
  );
};

export default ShipmentList;
