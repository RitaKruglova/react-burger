import { useDispatch } from "react-redux";
import Modal from "../components/modal/modal";
import { setCurrentIngredient } from "../store/slices/ingredientsSlice";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useNavigate } from "react-router-dom";

function IngredientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClose() {
    dispatch(setCurrentIngredient(null));
    navigate('/');
  }

  return (
    <Modal
      isOrderDetails={false}
      title="Детали ингредиента"
      closeModal={handleClose}
    >
      <IngredientDetails />
    </Modal>
  )
}

export default IngredientPage;