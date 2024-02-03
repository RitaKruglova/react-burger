import orderListStyles from './order-list.module.css';
import { FC, useEffect } from 'react';
import Order from './order/order';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';
import { TOrder } from '../../utils/types';

interface IOrderListProps {
  isProfilePlace: boolean
}

const OrderList: FC<IOrderListProps> = ({ isProfilePlace }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector( store => ({
    orders: isProfilePlace ? store.webSocket.myOrders : store.webSocket.allOrders
  }))

  function showOrder(order: TOrder): void {
    navigate(String(order.number), { state: { backgroundLocation: location } });
  }

  useEffect(() => {
    if (isProfilePlace) {
      dispatch({type: 'webSocket/startMyOrders'})
    } else {
      dispatch({ type: 'webSocket/startAllOrders'});
    }

    return () => {
      dispatch({ type: 'webSocket/close'})
    }
  }, [dispatch]);

  console.log(orders)

  return (
    <>
    {orders.length === 0 ?
      <></>
    :
      <ul className={`${orderListStyles.container} ${isProfilePlace ? orderListStyles.profile : ''}`}>
        {orders.map(order => (
          <Order
            key={order._id}
            onClick={() => showOrder(order)}
            isProfilePlace={isProfilePlace}
            number={order.number}
            name={order.name}
          />
        ))}      
      </ul>
    }
      <Outlet />
    </>
  )
}

export default OrderList;