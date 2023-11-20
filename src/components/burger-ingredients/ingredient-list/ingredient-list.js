import ingredientListStyles from './ingredient-list.module.css';

function IngredientList({ children, title }) {
  return (
    <>
      <h2 className={`${ingredientListStyles.title} text text_type_main-medium`}>{title}</h2>
      <ul className={ingredientListStyles.list}>
        {children}
      </ul>
    </>
  )
}

export default IngredientList;