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

  // когда я создаю заказ на главной странице его номер четырехзначный, а у всех заказов в ленте номера пятизначные
  // не понятно почему в ленте заказов в профиле веб сокет возвращает пустой массив, хотя заказы я создаю и когда тестирую через постман апи, то заказы там есть, которые я создала (проверяю по запросу с номером заказа)
  // Уважаемый Ревьюер, подскажите пожалуйста что я не так поняла, заранее спасибо <3

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