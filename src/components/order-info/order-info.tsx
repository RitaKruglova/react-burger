import orderInfoStyles from './order-info.module.css';
import { FC } from 'react';
import OrderItem from './order-item/order-item';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCurrentOrder } from '../../hooks/useCurrentOrder';
import { TIngredient } from '../../utils/types';

interface IOrderInfo {
  orderNumber: string | undefined;
}

const OrderInfo: FC<IOrderInfo> = ({ orderNumber }) => {
  const order = useCurrentOrder(Number(orderNumber));

  type TCountedIngredients = {
    [key: string]: Omit<TIngredient, 'count'> & {
      count: number;
    }
  }

  const countedIngredients: TCountedIngredients = order.ingredients.reduce((acc: TCountedIngredients, ingredient: TIngredient) => {
    if (acc[ingredient._id]) {
      acc[ingredient._id].count += 1;
    } else {
      acc[ingredient._id] = { ...ingredient, count: 1 };
    }
    return acc;
  }, {});

  console.log(1, order.ingredients)
  console.log(countedIngredients)

  return (
    <div className={`${orderInfoStyles.container} mt-5`}>
      <h3 className="text text_type_main-medium mb-2">{order.name}</h3>
      <p className={`${orderInfoStyles.status} text text_type_main-default`}>{order.statusText}</p>
      <h4 className="text text_type_main-medium mb-6">Состав:</h4>
      <ul className={orderInfoStyles.list}>
        {Object.values(countedIngredients).map((i, index) => (
          <OrderItem key={`${i._id}-${index}`} image={i.image} name={i.name} quantity={i.count || 1} price={i.price} />
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