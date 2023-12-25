import { useDispatch, useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredient-details.module.css';
import NutritionalValue from './nutritional-value/nutritional-value';
import { useEffect } from 'react';
import { setCurrentIngredient } from '../../store/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

function IngredientDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { currentIngredient, dataIngredients } = useSelector(store => ({
    currentIngredient: store.ingredients.currentIngredient,
    dataIngredients: store.ingredients.dataIngredients
  }));

  useEffect(() => {
    dispatch(setCurrentIngredient(dataIngredients.filter(i => i._id === id)[0]))
  },[dispatch, dataIngredients, id])

  if (!currentIngredient) {
    return null;
  }
  
  return (
    <>
      <img
        className={ingredientDetailsStyles.image}
        src={currentIngredient['image']}
        alt={currentIngredient['name']}
      />
      <h5 className={`${ingredientDetailsStyles.title} mt-4 text text_type_main-medium`}>{currentIngredient['name']}</h5>
      <ul className={`${ingredientDetailsStyles.list} mt-8 mb-15`}>
        <NutritionalValue title="Калории,ккал" value={currentIngredient['calories']} />
        <NutritionalValue title="Белки, г" value={currentIngredient['proteins']} />
        <NutritionalValue title="Жиры, г" value={currentIngredient['fat']} />
        <NutritionalValue title="Углеводы, г" value={currentIngredient['carbohydrates']} />
      </ul>
    </>
  )
}

export default IngredientDetails;