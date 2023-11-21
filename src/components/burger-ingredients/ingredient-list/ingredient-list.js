import ingredientListStyles from './ingredient-list.module.css';

function IngredientList({ children, title }) {
  return (
    <>
      <h2 className={`${ingredientListStyles.title} text text_type_main-medium mb-6`}>{title}</h2>
      <ul className={`${ingredientListStyles.list} ml-4`}>
        {children}
      </ul>
    </>
  )
}

export default IngredientList;