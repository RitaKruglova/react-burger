import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import burgerStyles from './burger.module.css'

function Burger() {
  return (
    <section className={burgerStyles.burger}>
      <BurgerIngredients />
    </section>
  )
}

export default Burger;