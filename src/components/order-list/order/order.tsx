import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../../utils/reduxHooks';

const Order: FC = () => {
  const { dataIngredients } = useAppSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients
  }));


  return (
    <li className={`${orderStyles.container} p-6`}>
      <div className={`${orderStyles.info} mb-6`}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default">Сегодня, 16:20</p>
      </div>
      <h3 className="text text_type_main-medium mb-6">Death Star Starship Main бургер</h3>
      <div className={orderStyles.order}>
        <div className={`${orderStyles.ingredients} mr-6`}>
          {dataIngredients.slice(0, 5).map(i => (
            <img key={i._id} className={orderStyles.image} src={i.image} alt={i.name} />
          ))}
          {dataIngredients.length > 5 &&
            <div className={orderStyles.extra} style={{ backgroundImage: `url(${dataIngredients[5].image})` }}>
              +{dataIngredients.length - 5}
            </div>
          }
        </div>
        <div className={orderStyles.price}>
          <p className="text text_type_digits-medium">480</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </li>
  )
}

export default Order;