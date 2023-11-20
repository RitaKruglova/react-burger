import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({ src, alt, price, name, count }) {
  return (
    <li className={ingredientStyles.ingredient}>
      <img src={src} alt={alt} />
      <div className={ingredientStyles.cost}>
        <p className={ingredientStyles.price}></p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={ingredientStyles.name}></h3>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  )
}

export default Ingredient;