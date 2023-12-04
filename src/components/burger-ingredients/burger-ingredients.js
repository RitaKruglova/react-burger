import { useState, useMemo } from 'react';
import Modal from '../modal/modal';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';
import IngredientList from './ingredient-list/ingredient-list';
import Ingredient from './ingredient/ingredient';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';

function BurgerIngredients({ setIsIngredientDetailsModalOpen, isIngredientDetailsModalOpen }) {
  const dataIngredients = useSelector(store => store.ingredients.data);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const buns = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'bun'), [dataIngredients]);
  const sauce = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'sauce'), [dataIngredients]);
  const main = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'main'), [dataIngredients]);

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
        >
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      }
      
    </section>
  )
}

BurgerIngredients.propTypes = {
  setIsIngredientDetailsModalOpen: PropTypes.func.isRequired,
  isIngredientDetailsModalOpen: PropTypes.bool
}

export default BurgerIngredients;