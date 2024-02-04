import orderListStyles from './order-list.module.css';
import { FC, useCallback, useEffect, useState } from 'react';
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

  const { myOrders, allOrders } = useAppSelector(store => ({
    myOrders: store.webSocket.myOrders,
    allOrders: store.webSocket.allOrders
  }));

  function showOrder(order: TOrder): void {
    navigate(String(order.number), { state: { backgroundLocation: location } });
  }

  const connectToWebSocket = useCallback(() => {
    if (isProfilePlace) {
      if (localStorage.getItem('accessToken')) {
        dispatch({type: 'webSocket/startMyOrders'})
      }
    } else {
      dispatch({ type: 'webSocket/startAllOrders'});
    }
  }, [dispatch, isProfilePlace]);

  useEffect(() => {
    window.addEventListener('accessTokenChanged', connectToWebSocket);

    connectToWebSocket();

    return () => {
      window.removeEventListener('accessTokenChanged', connectToWebSocket);
      dispatch({ type: 'webSocket/close'})
    }
  }, [dispatch, connectToWebSocket]);

  if (isProfilePlace && myOrders.length === 0) return null;
  if (!isProfilePlace && allOrders.length === 0) return null;

  const orders = isProfilePlace ? myOrders : allOrders;

  return (
    <>
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
      <Outlet />
    </>
  );
}

export default OrderList;