import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import burgerStyles from './burger.module.css'

function Burger({ dataIngredients }) {
  return (
    <section className={burgerStyles.burger}>
      <BurgerIngredients dataIngredients={dataIngredients} />
      <BurgerConstructor dataIngredients={dataIngredients} />
    </section>
  )
}

export default Burger;