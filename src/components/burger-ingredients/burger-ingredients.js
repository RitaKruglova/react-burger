import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';
import IngredientList from './ingredient-list/ingredient-list';
import Ingredient from './ingredient/ingredient';
import data from '../../utils/data';

function BurgerIngredients({ dataIngredients }) {
  console.log(dataIngredients);
  const buns = data.filter((ingredient) => ingredient['type'] === 'bun');
  const sauce = data.filter((ingredient) => ingredient['type'] === 'sauce');
  const main = data.filter((ingredient) => ingredient['type'] === 'main');
  
  return (
    <section className={`${burgerIngredientsStyles.container} mt-10`}>
      <h1 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <BurgerNavigation />
      <div className={`${burgerIngredientsStyles.ingredients} mt-10`}>
        <IngredientList title="Булки">
          {buns.map((ingredient) => (
            <Ingredient key={ingredient['_id']} src={ingredient['image']} name={ingredient['name']} price={ingredient['price']} />
          ))}
        </IngredientList>
        <IngredientList title="Соусы">
          {sauce.map((ingredient) => (
            <Ingredient key={ingredient['_id']} src={ingredient['image']} name={ingredient['name']} price={ingredient['price']} />
          ))}
        </IngredientList>
        <IngredientList title="Начинки">
          {main.map((ingredient) => (
            <Ingredient key={ingredient['_id']} src={ingredient['image']} name={ingredient['name']} price={ingredient['price']} />
          ))}
        </IngredientList>
      </div>
    </section>
  )
}

export default BurgerIngredients;