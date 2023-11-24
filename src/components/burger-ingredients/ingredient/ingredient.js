import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Ingredient({ src, name, price, onClick }) {
  return (
    <li className={ingredientStyles.ingredient} onClick={onClick}>
      <img className={`${ingredientStyles.image} mb-1`} src={src} alt={name} />
      <div className={`${ingredientStyles.cost} mb-1`}>
        <p className={`${ingredientStyles.price} text text_type_digits-default mr-1`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${ingredientStyles.name} text text_type_main-default`}>{name}</h3>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  )
}

Ingredient.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Ingredient;