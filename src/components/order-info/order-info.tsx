import orderInfoStyles from './order-info.module.css';
import { FC } from 'react';
import OrderItem from './order-item/order-item';
import { useAppSelector } from '../../utils/reduxHooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo: FC = () => {
  const { dataIngredients } = useAppSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients
  }));

  return (
    <div className={`${orderInfoStyles.container} mt-5`}>
      <h3 className="text text_type_main-medium mb-2">Black Hole Singularity острый бургер</h3>
      <p className={`${orderInfoStyles.status} text text_type_main-default`}>Выполнен</p>
      <h4 className="text text_type_main-medium mb-6">Состав:</h4>
      <ul className={orderInfoStyles.list}>
        {dataIngredients.map(i => (
          <OrderItem image={i.image} name={i.name} quantity={1} price={i.price} />
        ))}
      </ul>
      <div className={`${orderInfoStyles.result} mt-8 mb-10`}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
        <div className={orderInfoStyles.price}>
          <p className="text text_type_digits-default mr-2">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;