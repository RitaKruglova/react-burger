import ingredientDetailsStyles from './ingredient-details.module.css';
import NutritionalValue from './nutritional-value/nutritional-value';

function IngredientDetails({ currentIngredient }) {
  console.log(currentIngredient);
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