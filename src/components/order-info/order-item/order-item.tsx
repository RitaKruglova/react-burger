import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientRoundImage from '../../ingredient-round-image/ingredient-round-image';
import orderItemStyles from './order-item.module.css';
import { FC } from 'react';

interface IOrderItemProps {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

const OrderItem: FC<IOrderItemProps> = ({ image, name, quantity, price }) => {
  return (
    <li className={`${orderItemStyles.container} pr-6 mb-4`}>
      <IngredientRoundImage isOrderPlace={false} image={image} name={name} />
      <h5 className={`${orderItemStyles.title} text text_type_main-default`}>{name}</h5>
      <div className={orderItemStyles.price}>
        <p className="text text_type_digits-default mr-2">{`${quantity} x ${price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}
export default OrderItem;