import orderListStyles from './order-list.module.css';
import { FC } from 'react';
import Order from './order/order';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderList: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function showOrder(number: string = '034535'): void {
    navigate(number, { state: { backgroundLocation: location } });
  }

  return (
    <ul className={orderListStyles.container}>
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
      <Order onClick={() => showOrder()} />
    </ul>
  )
}

export default OrderList;