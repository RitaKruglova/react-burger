import { useDispatch } from "react-redux";
import Modal from "../components/modal/modal";
import { setCurrentIngredient } from "../store/slices/ingredientsSlice";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useNavigate } from "react-router-dom";
import ingredientPageStyles from './ingredient-page.module.css';
import PropTypes from 'prop-types'
import { mainRoute } from "../constants/constants";

function IngredientPage({ previousPath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  function handleClose() {
    dispatch(setCurrentIngredient(null));
    navigate(mainRoute);
  }

  console.log(previousPath)

  return (
    previousPath === mainRoute ?
      <Modal
        isOrderDetails={false}
        title="Детали ингредиента"
        closeModal={handleClose}
      >
        <IngredientDetails />
      </Modal>
    :
      <div className={ingredientPageStyles.container}>
        <h4 className={`${ingredientPageStyles.title} text text_type_main-large`}>Детали ингредиента</h4>
        <IngredientDetails />
      </div>
  )
}

IngredientPage.propTypes = {
  previousPath: PropTypes.string.isRequired
}

export default IngredientPage;