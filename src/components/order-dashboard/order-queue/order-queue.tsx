import { useAppSelector } from '../../../utils/reduxHooks';
import orderQueueStyles from './order-queue.module.css';
import { FC } from 'react';

interface IOrderQueueProps {
  isDoneOrders: boolean
}

const OrderQueue: FC<IOrderQueueProps> = ({ isDoneOrders }) => {
  const { allOrders } = useAppSelector(store => ({
    allOrders: store.webSocket.allOrders
  }))

  // не поняла Вашего комментария, объясните подробно что здесь не так

  return (
    <div className={`${orderQueueStyles.container} ${isDoneOrders ? 'mr-9' : ''}`}>
      <h3 className={`${orderQueueStyles.title} text text_type_main-medium mb-6`}>{isDoneOrders ? 'Готовы:' : 'В работе:'}</h3>
      <ul className={orderQueueStyles.list}>
        {allOrders.slice(0, 10).filter(order => order.status === (isDoneOrders ? 'done' : 'pending')).map(order =>
            <li key={order._id} className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>{order.number}</li>
        )}
      </ul>
    </div>
  )
}

export default OrderQueue;
