import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';

function BurgerIngredients() {
  

  return (
    <section className={burgerIngredientsStyles.container}>
      <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
      <BurgerNavigation />
    </section>
  )
}

export default BurgerIngredients;