import orderListStyles from './order-list.module.css';
import { FC, useCallback, useEffect } from 'react';
import Order from './order/order';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';
import { TOrder } from '../../utils/types';
import { wsClose, wsStartAllOrders, wsStartMyOrders } from '../../constants/constants';
import { getAllOrders, getMyOrders } from '../../utils/selectors';

interface IOrderListProps {
  isProfilePlace: boolean
}

const OrderList: FC<IOrderListProps> = ({ isProfilePlace }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const myOrders = useAppSelector(getMyOrders);
  const allOrders = useAppSelector(getAllOrders);

  function showOrder(order: TOrder): void {
    navigate(String(order.number), { state: { backgroundLocation: location } });
  }

  const connectToWebSocket = useCallback(() => {
    if (isProfilePlace) {
      if (localStorage.getItem('accessToken')) {
        dispatch({type: wsStartMyOrders})
      }
    } else {
      dispatch({ type: wsStartAllOrders});
    }
  }, [dispatch, isProfilePlace]);

  useEffect(() => {
    window.addEventListener('accessTokenChanged', connectToWebSocket);

    connectToWebSocket();

    return () => {
      window.removeEventListener('accessTokenChanged', connectToWebSocket);
      dispatch({ type: wsClose})
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