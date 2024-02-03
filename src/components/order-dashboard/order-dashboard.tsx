import orderDashboardStyles from './order-dashboard.module.css';
import { FC } from 'react';
import OrderQueue from './order-queue/order-queue';
import OrderStats from './order-stats/order-stats';
import { useAppSelector } from '../../utils/reduxHooks';

const OrderDashboard: FC = () => {
  const { total } = useAppSelector(store => ({
    total: store.webSocket.total
  }));

  return (
    <div className={`${orderDashboardStyles.container} ml-15`}>
      <div className={`${orderDashboardStyles.queues} mb-15`}>
        <OrderQueue isDoneOrders={true} />
        <OrderQueue isDoneOrders={false} />
      </div>
      <OrderStats isForToday={false} ordersQuantity={total.total} />
      <OrderStats isForToday={true} ordersQuantity={total.totalToday} />
    </div>
  )
}

export default OrderDashboard;