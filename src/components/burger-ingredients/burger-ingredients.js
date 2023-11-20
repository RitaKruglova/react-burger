import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';
import IngredientList from './ingredient-list/ingredient-list';

function BurgerIngredients() {
  
  return (
    <section className={`${burgerIngredientsStyles.container} mt-10`}>
      <h1 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <BurgerNavigation />
      <div className={`${burgerIngredientsStyles.ingredients} mt-10`}>
        <IngredientList title="Булки">
          {}
        </IngredientList>
        <IngredientList title="Соусы">
          {}
        </IngredientList>
        <IngredientList title="Начинки">
          {}
        </IngredientList>
      </div>
    </section>
  )
}

export default BurgerIngredients;