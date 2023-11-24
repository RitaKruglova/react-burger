import ingredientDetailsStyles from './ingredient-details.module.css';
import NutritionalValue from './nutritional-value/nutritional-value';
import PropTypes from 'prop-types';

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

IngredientDetails.propTypes = {
  currentIngredient: PropTypes.shape({
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
}

export default IngredientDetails;