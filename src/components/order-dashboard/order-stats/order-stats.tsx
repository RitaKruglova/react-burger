import orderStatsStyles from './order-stats.module.css';
import { FC } from 'react';

interface IOrderStatsProps {
  isForToday: boolean;
  ordersQuantity: number;
}

const OrderStats: FC<IOrderStatsProps> = ({ isForToday, ordersQuantity }) => {
  return (
    <div className={orderStatsStyles.container}>
      <h4 className={`${orderStatsStyles.title} text text_type_main-medium`}>{isForToday ? 'Выполнено за сегодня:' : 'Выполнено за все время:'}</h4>
      <p className="text text_type_digits-large">{ordersQuantity}</p>
    </div>
  )
}

export default OrderStats;