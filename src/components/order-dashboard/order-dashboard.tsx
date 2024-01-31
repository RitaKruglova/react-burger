import orderDashboardStyles from './order-dashboard.module.css';
import { FC } from 'react';
import OrderQueue from './order-queue/order-queue';
import OrderStats from './order-stats/order-stats';

const OrderDashboard: FC = () => {
  return (
    <div className={`${orderDashboardStyles.container} ml-15`}>
      <div className={`${orderDashboardStyles.queues} mb-15`}>
        <OrderQueue isDoneOrders={true} />
        <OrderQueue isDoneOrders={false} />
      </div>
      <OrderStats isForToday={false} ordersQuantity={28752} />
      <OrderStats isForToday={true} ordersQuantity={138} />
    </div>
  )
}

export default OrderDashboard;