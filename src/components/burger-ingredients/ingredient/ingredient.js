import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd/dist/hooks';
import { ingredientType } from '../../../utils/types';

function Ingredient({ ingredient, onClick }) {
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
      {ingredient.count > 0 &&
        <Counter count={ingredient.count} size="default" extraClass="m-1" />
      }
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Ingredient;