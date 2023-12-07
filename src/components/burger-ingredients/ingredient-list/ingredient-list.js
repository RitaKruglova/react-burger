import ingredientListStyles from './ingredient-list.module.css';
import PropTypes from 'prop-types';

function IngredientList({ children, title, forwardRef }) {
  return (
    <>
      <h2 className={`${ingredientListStyles.title} text text_type_main-medium mb-6`} ref={forwardRef}>{title}</h2>
      <ul className={`${ingredientListStyles.list} ml-4 mr-4`}>
        {children}
      </ul>
    </>
  )
}

IngredientList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string.isRequired,
  forwardRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ])
}

export default IngredientList;