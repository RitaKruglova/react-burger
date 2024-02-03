import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';
import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import IngredientRoundImage from '../../ingredient-round-image/ingredient-round-image';
import { setCurrentOrder } from '../../../store/slices/orderSlice';

interface IOrderProps {
  onClick: () => void;
  isProfilePlace?: boolean;
  number: number;
  name: string;
  ingredientIds: string[];
  createdAt: string;
  status: string;
}

const Order: FC<IOrderProps> = ({ onClick, isProfilePlace, number, name, ingredientIds, createdAt, status }) => {
  const { dataIngredients } = useAppSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients
  }));
  const dispatch = useAppDispatch();

  const ingredients = useMemo(() => {
    const result = [];
    for (let id of ingredientIds) {
      const ingredient = dataIngredients.find(i => id === i._id);
      if (ingredient !== undefined) {
        result.push(ingredient);
      }
    }
    return result;
  }, [ingredientIds, dataIngredients]);

  const date = new Date(Date.parse(createdAt));

  let statusText: string;

  switch (status) {
    case 'pending':
      statusText = 'Готовится';
      break;
    case 'done':
      statusText = 'Выполнен';
      break;
    case 'canceled':
      statusText = 'Отменен';
      break;
    default:
      statusText = 'Создан';
  }

  const price: number = ingredients.reduce((prevI, i) => prevI + i.price, 0);

  function handleClick(): void {
    dispatch(setCurrentOrder({
      number,
      name,
      statusText,
      ingredients,
      date,
      price
    }));
    onClick();
  }

  return (
    <li className={`${orderStyles.container} p-6 mb-4 mr-2 ${isProfilePlace ? orderStyles.wide : ''}`} onClick={handleClick}>
      <div className={`${orderStyles.info} mb-6`}>
        <p className="text text_type_digits-default">{`#${number}`}</p>
        <FormattedDate date={date} />
      </div>
      <h3 className="text text_type_main-medium">{name}</h3>
      {isProfilePlace && <p className={`${statusText === 'Выполнен' ? orderStyles.blue : ''} ${statusText === 'Отменен' ? orderStyles.red : ''} text text_type_main-default mt-2`}>{statusText}</p>}
      <div className={`${orderStyles.order} mt-6`}>
        <div className={`${orderStyles.ingredients} mr-6`}>
          {ingredients.slice(0, 5).map((i, index) => (
            <IngredientRoundImage key={`${i._id}-${index}`} isOrderPlace={true} image={i.image} name={i.name} index={index} />
          ))}
          {ingredients.length > 5 &&
            <div className={orderStyles.extra} style={{ backgroundImage: `url(${ingredients[5].image})` }}>
              <div className={`${orderStyles.text} text text_type_digits-default`}>
                +{ingredients.length - 5}
              </div>
            </div>
          }
        </div>
        <div className={orderStyles.price}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </li>
  )
}

export default Order;