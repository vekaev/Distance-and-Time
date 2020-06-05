import React from 'react';
import ShipmentBtn from './ShipmentBtn';
import style from './ShipmentList.module.scss';

const ShipmentList = ({ toggleActive, active }) => {
  return (
    <div className={style.shipment__choose}>
      <span className={style.title}>transportation by</span>
      <ul className={`${style[`btn__list`]} ${style[`${active}__list`]}`}>
        <ShipmentBtn toggleActive={toggleActive} active={active} title='sea' />
        <ShipmentBtn toggleActive={toggleActive} active={active} title='land' />
        <ShipmentBtn toggleActive={toggleActive} active={active} title='air' />
      </ul>
    </div>
  );
};

export default ShipmentList;
