import orderInfoStyles from './order-info.module.css';
import { FC } from 'react';
import OrderItem from './order-item/order-item';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCurrentOrder } from '../../hooks/useCurrentOrder';

interface IOrderInfo {
  orderNumber: string | undefined;
}

const OrderInfo: FC<IOrderInfo> = ({ orderNumber }) => {
  const order = useCurrentOrder(Number(orderNumber));

  return (
    <div className={`${orderInfoStyles.container} mt-5`}>
      <h3 className="text text_type_main-medium mb-2">{order.name}</h3>
      <p className={`${orderInfoStyles.status} text text_type_main-default`}>{order.statusText}</p>
      <h4 className="text text_type_main-medium mb-6">Состав:</h4>
      <ul className={orderInfoStyles.list}>
        {order.ingredients.map(i => (
          <OrderItem image={i.image} name={i.name} quantity={1} price={i.price} />
        ))}
      </ul>
      <div className={`${orderInfoStyles.result} mt-8 mb-10`}>
      <FormattedDate date={order.date} />
        <div className={orderInfoStyles.price}>
          <p className="text text_type_digits-default mr-2">{order.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;