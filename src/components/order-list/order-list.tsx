import orderListStyles from './order-list.module.css';
import { FC, useEffect } from 'react';
import Order from './order/order';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';

interface IOrderListProps {
  isProfilePlace: boolean
}

const OrderList: FC<IOrderListProps> = ({ isProfilePlace }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector( store => ({
    orders: store.webSocket.orders
  }))

  function showOrder(number: string = '034535'): void {
    navigate(number, { state: { backgroundLocation: location } });
  }

  useEffect(() => {
    dispatch({ type: 'webSocket/start'});

    return () => {
      dispatch({ type: 'webSocket/close'})
    }
  }, [dispatch]);

  console.log(orders)

  return (
    <>
      <ul className={`${orderListStyles.container} ${isProfilePlace ? orderListStyles.profile : ''}`}>
        {orders.map(order => (
          <Order
            key={order._id}
            onClick={() => showOrder()}
            isProfilePlace={isProfilePlace}
            number={order.number}
            name={order.name}
            ingredientIds={order.ingredients}
            createdAt={order.createdAt}
            status={order.status}
          />
        ))}      
      </ul>
      <Outlet />
    </>
  )
}

export default OrderList;