import { useState } from 'react';
import Modal from '../modal/modal';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';
import IngredientList from './ingredient-list/ingredient-list';
import Ingredient from './ingredient/ingredient';
import PropTypes from 'prop-types';

function BurgerIngredients({ dataIngredients, setIsIngredientDetailsModalOpen, isIngredientDetailsModalOpen }) {
  const [currentIngredient, setCurrentIngredient] = useState({});
  const buns = dataIngredients.filter((ingredient) => ingredient['type'] === 'bun');
  const sauce = dataIngredients.filter((ingredient) => ingredient['type'] === 'sauce');
  const main = dataIngredients.filter((ingredient) => ingredient['type'] === 'main');

  function showDetails(ingredient) {
    setIsIngredientDetailsModalOpen(true);
    setCurrentIngredient(ingredient);
  }
  
  return (
    <section className={`${burgerIngredientsStyles.container} mt-10`}>
      <h1 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <BurgerNavigation />
      <div className={`${burgerIngredientsStyles.ingredients} mt-10`}>
        <IngredientList title="Булки">
          {buns.map((ingredient) => (
            <Ingredient key={ingredient['_id']} src={ingredient['image']} name={ingredient['name']} price={ingredient['price']} onClick={() => showDetails(ingredient)} />
          ))}
        </IngredientList>
        <IngredientList title="Соусы">
          {sauce.map((ingredient) => (
            <Ingredient key={ingredient['_id']} src={ingredient['image']} name={ingredient['name']} price={ingredient['price']} onClick={() => showDetails(ingredient)} />
          ))}
        </IngredientList>
        <IngredientList title="Начинки">
          {main.map((ingredient) => (
            <Ingredient key={ingredient['_id']} src={ingredient['image']} name={ingredient['name']} price={ingredient['price']} onClick={() => showDetails(ingredient)} />
          ))}
        </IngredientList>
      </div>
      {isIngredientDetailsModalOpen &&
        <Modal
          isOrderDetails={false}
          title="Детали ингредиента"
          setIsModalOpen={setIsIngredientDetailsModalOpen}
          currentIngredient={currentIngredient}
        />
      }
      
    </section>
  )
}

BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number
    })
  ),
  setIsIngredientDetailsModalOpen: PropTypes.func.isRequired,
  isIngredientDetailsModalOpen: PropTypes.any
}

export default BurgerIngredients;