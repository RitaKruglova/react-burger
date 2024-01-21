import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd/dist/hooks';
import { TIngredient } from '../../../utils/types';
import { FC } from 'react';

interface IIngredientProps {
  ingredient: TIngredient;
  onClick: () => void;
}

const Ingredient: FC<IIngredientProps> = ({ ingredient, onClick }) => {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  return (
    <li className={ingredientStyles.ingredient} onClick={onClick} ref={dragRef}>
      <img className={`${ingredientStyles.image} mb-1`} src={ingredient['image']} alt={ingredient['name']} />
      <div className={`${ingredientStyles.cost} mb-1`}>
        <p className={`${ingredientStyles.price} text text_type_digits-default mr-1`}>{ingredient['price']}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${ingredientStyles.name} text text_type_main-default`}>{ingredient['name']}</h3>
      {ingredient.count && ingredient.count > 0 &&
        <Counter count={ingredient.count} size="default" extraClass="m-1" />
      }
    </li>
  )
}

export default Ingredient;