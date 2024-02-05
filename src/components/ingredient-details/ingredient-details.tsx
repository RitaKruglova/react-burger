import ingredientDetailsStyles from './ingredient-details.module.css';
import NutritionalValue from './nutritional-value/nutritional-value';
import { FC, useEffect } from 'react';
import { setCurrentIngredient } from '../../store/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../utils/reduxHooks';
import { getCurrentIngredient, getDataIngredients } from '../../utils/selectors';

const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const dataIngredients = useAppSelector(getDataIngredients);
  const currentIngredient = useAppSelector(getCurrentIngredient);

  useEffect(() => {
    dispatch(setCurrentIngredient(dataIngredients.filter(i => i._id === id)[0]))
  },[dispatch, dataIngredients, id])

  if (!currentIngredient) {
    return null;
  }
  
  return (
    <div className={ingredientDetailsStyles.container}>
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
    </div>
  )
}

export default IngredientDetails;