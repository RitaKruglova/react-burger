import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';
import { FC } from 'react';
import IngredientRoundImage from '../../ingredient-round-image/ingredient-round-image';
import { useCurrentOrder } from '../../../hooks/useCurrentOrder';

interface IOrderProps {
  onClick: () => void;
  isProfilePlace?: boolean;
  number: number;
  name: string;
}

const Order: FC<IOrderProps> = ({ onClick, isProfilePlace, number, name }) => {
  const order = useCurrentOrder(number);

  return (
    <li className={`${orderStyles.container} p-6 mb-4 mr-2 ${isProfilePlace ? orderStyles.wide : ''}`} onClick={onClick}>
      <div className={`${orderStyles.info} mb-6`}>
        <p className="text text_type_digits-default">{`#${number}`}</p>
        <FormattedDate date={order.date} />
      </div>
      <h3 className="text text_type_main-medium">{name}</h3>
      {isProfilePlace && <p className={`${order.statusText === 'Выполнен' ? orderStyles.blue : ''} ${order.statusText === 'Отменен' ? orderStyles.red : ''} text text_type_main-default mt-2`}>{order.statusText}</p>}
      <div className={`${orderStyles.order} mt-6`}>
        <div className={`${orderStyles.ingredients} mr-6`}>
          {order.ingredients.slice(0, 5).map((i, index) => (
            <IngredientRoundImage key={`${i._id}-${index}`} isOrderPlace={true} image={i.image} name={i.name} index={index} />
          ))}
          {order.ingredients.length > 5 &&
            <div className={orderStyles.extra} style={{ backgroundImage: `url(${order.ingredients[5].image})` }}>
              <div className={`${orderStyles.text} text text_type_digits-default`}>
                +{order.ingredients.length - 5}
              </div>
            </div>
          }
        </div>
        <div className={orderStyles.price}>
          <p className="text text_type_digits-default mr-2">{order.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </li>
  )
}

export default Order;