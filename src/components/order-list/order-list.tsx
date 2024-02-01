import orderListStyles from './order-list.module.css';
import { FC } from 'react';
import Order from './order/order';
import { useLocation, useNavigate } from 'react-router-dom';

interface IOrderListProps {
  isProfilePlace: boolean
}

const OrderList: FC<IOrderListProps> = ({ isProfilePlace }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function showOrder(number: string = '034535'): void {
    navigate(number, { state: { backgroundLocation: location } });
  }

  return (
    <ul className={`${orderListStyles.container} ${isProfilePlace ? orderListStyles.profile : ''}`}>
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />
      <Order onClick={() => showOrder()} isProfilePlace={isProfilePlace} />      
    </ul>
  )
}

export default OrderList;