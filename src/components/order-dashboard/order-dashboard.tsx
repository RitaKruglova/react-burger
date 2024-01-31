import orderDashboardStyles from './order-dashboard.module.css';
import { FC } from 'react';
import OrderQueue from './order-queue/order-queue';

const OrderDashboard: FC = () => {
  return (
    <div className={`${orderDashboardStyles.container} ml-15`}>
      <div className={orderDashboardStyles.queues}>
        <OrderQueue isDoneOrders={true} />
        <OrderQueue isDoneOrders={false} />
      </div>
    </div>
  )
}

export default OrderDashboard;