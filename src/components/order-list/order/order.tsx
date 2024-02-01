import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../../utils/reduxHooks';
import IngredientRoundImage from '../../ingredient-round-image/ingredient-round-image';

const Order: FC = () => {
  const { dataIngredients } = useAppSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients
  }));


  return (
    <li className={`${orderStyles.container} p-6 mb-4 mr-2`}>
      <div className={`${orderStyles.info} mb-6`}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
      </div>
      <h3 className="text text_type_main-medium mb-6">Death Star Starship Main бургер</h3>
      <div className={orderStyles.order}>
        <div className={`${orderStyles.ingredients} mr-6`}>
          {dataIngredients.slice(0, 5).map((i, index) => (
            <IngredientRoundImage key={i._id} isOrderPlace={true} image={i.image} name={i.name} index={index} />
          ))}
          {dataIngredients.length > 5 &&
            <div className={orderStyles.extra} style={{ backgroundImage: `url(${dataIngredients[5].image})` }}>
              <div className={`${orderStyles.text} text text_type_digits-default`}>
                +{dataIngredients.length - 5}
              </div>
            </div>
          }
        </div>
        <div className={orderStyles.price}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </li>
  )
}

export default Order;