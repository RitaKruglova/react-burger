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
    <div className={orderInfoStyles.container}>
      <p className="text text_type_digits-default">#034533</p>
      <h3 className="text text_type_main-medium">Black Hole Singularity острый бургер</h3>
      <p className={`${orderInfoStyles.status} text text_type_main-default`}>Выполнен</p>
      <h4 className="text text_type_main-medium">Состав:</h4>
      <ul className={orderInfoStyles.list}>
        {dataIngredients.map(i => (
          <OrderItem image={i.image} name={i.name} quantity={1} price={i.price} />
        ))}
      </ul>
      <div className={orderInfoStyles.result}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
        <div className={orderInfoStyles.price}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;