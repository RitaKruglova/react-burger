import { useDispatch } from "react-redux";
import Modal from "../components/modal/modal";
import { setCurrentIngredient } from "../store/slices/ingredientsSlice";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useLocation, useNavigate } from "react-router-dom";
import ingredientPageStyles from './ingredient-page.module.css';
import PropTypes from 'prop-types'
import { mainRoute } from "../constants/constants";

function IngredientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  let state = location.state;

  function handleClose() {
    dispatch(setCurrentIngredient(null));
    navigate(mainRoute);
  }

  return (
    state?.backgroundLocation ?
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

export default IngredientPage;