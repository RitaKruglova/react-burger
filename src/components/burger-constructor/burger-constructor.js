import burgerConstructorStyles from './burger-constructor.module.css';
import { useState, useEffect } from 'react';
import ListItem from './list-item/list-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyIconPath from '../../images/currency-icon.svg';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { addBun, addIngredient, cleanDraggedIngredients } from '../../store/slices/ingredientsSlice';
import { fetchOrder, removeOrderNumber } from '../../store/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { loginRoute } from '../../constants/constants';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const { draggedIngredients, bun, orderNumber, error, currentUser } = useSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients,
    draggedIngredients: store.ingredients.draggedIngredients,
    bun: store.ingredients.bun,
    orderNumber: store.order.orderNumber,
    error: store.order.error,
    currentUser: store.form.currentUser
  }));
  
  const [sum, setSum] = useState(0);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      ingredient = { ...ingredient, uuid: crypto.randomUUID()};
      if (ingredient['type'] === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient))
      }
    }
  });

  useEffect(() => {
    if (orderNumber) {
      dispatch(cleanDraggedIngredients());
    }
  }, [dispatch, orderNumber]);

  useEffect(() => {
    setSum((draggedIngredients.reduce((prevVal, val) => prevVal + val['price'], 0)) + bun['price'] * 2)
  }, [draggedIngredients, bun])

  function createOrder() {
    if (!currentUser.name || !currentUser.email) {
      navigate(loginRoute);
    } else {
      dispatch(fetchOrder(draggedIngredients.map(i => i['_id']).concat(bun['_id'])));
      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={`${burgerConstructorStyles.container} pl-4 pr-4`}>
      <ul className={burgerConstructorStyles.list} ref={dropRef}>
        <ListItem
          place="top"
          ingredient={bun}
        />
        <div className={burgerConstructorStyles.scroll}>
          {
            draggedIngredients.map((ingredient, index) => (
              <ListItem
                key={ingredient.uuid}
                place="middle"
                ingredient={ingredient}
                index={index}
              />
            ))
          }
        </div>
          <ListItem
            place="bottom"
            ingredient={bun}
          />
      </ul>
      <div className={`${burgerConstructorStyles.order} mt-10 mr-6`}>
        <div className={`${burgerConstructorStyles.cost} mr-10`}>
          <p className={`${burgerConstructorStyles.sum} text text_type_digits-medium mr-2`}>{sum}</p>
          <img src={currencyIconPath} alt="Иконка валюты" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={createOrder} disabled={draggedIngredients.length === 0 || bun['price'] === 0}>
          Оформить заказ
        </Button>
      </div>
      {orderNumber &&
        <Modal
          isOrderDetails={true}
          title={orderNumber}
          closeModal={() => dispatch(removeOrderNumber())}
        >
          <OrderDetails />
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;
