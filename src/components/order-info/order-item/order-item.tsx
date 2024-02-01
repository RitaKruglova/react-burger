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
    <li className={orderItemStyles.container}>
      <IngredientRoundImage isOrderPlace={false} image={image} name={name} />
      <h5 className="text text_type_main-default">{name}</h5>
      <div className={orderItemStyles.price}>
        <p className="text text_type_digits-default">{`${quantity} x ${price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}
export default OrderItem;