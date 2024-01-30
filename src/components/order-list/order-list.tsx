import orderListStyles from './order-list.module.css';
import { FC } from 'react';
import Order from './order/order';

const OrderList: FC = () => {
  return (
    <ul className={orderListStyles.container}>
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
    </ul>
  )
}

export default OrderList;