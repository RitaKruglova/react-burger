import orderQueueStyles from './order-queue.module.css';
import { FC } from 'react';

interface IOrderQueueProps {
  isDoneOrders: boolean
}

const OrderQueue: FC<IOrderQueueProps> = ({ isDoneOrders }) => {
  return (
    <div className={`${orderQueueStyles.container} ${isDoneOrders ? 'mr-9' : ''}`}>
      <h3 className={`${orderQueueStyles.title} text text_type_main-medium mb-6`}>{isDoneOrders ? 'Готовы:' : 'В работе:'}</h3>
      <ul className={orderQueueStyles.list}>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000001</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000002</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000003</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000004</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000005</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000006</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000007</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000008</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000009</li>
        <li className={`${orderQueueStyles.item} ${isDoneOrders ? orderQueueStyles.blue : ''} text text_type_digits-default`}>000010</li>
      </ul>
    </div>
  )
}

export default OrderQueue;