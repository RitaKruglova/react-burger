import burgerConstructorStyles from './burger-constructor.module.css';
import { useState, useEffect, FC } from 'react';
import ListItem from './list-item/list-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyIconPath from '../../images/currency-icon.svg';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { addBun, addIngredient, cleanDraggedIngredients, cleanCounters } from '../../store/slices/ingredientsSlice';
import { fetchOrder, removeOrderNumber } from '../../store/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { loginRoute } from '../../constants/constants';
import { useAppSelector, useAppDispatch } from '../../utils/reduxHooks';
import { TBun, TIngredient } from '../../utils/types';
import { getBun, getDraggedIngredients, getOrderError, getOrderNumber } from '../../utils/selectors';

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const draggedIngredients = useAppSelector(getDraggedIngredients);
  const bun = useAppSelector(getBun);
  const orderNumber = useAppSelector(getOrderNumber);
  const error = useAppSelector(getOrderError);

  
  const [sum, setSum] = useState<number>(0);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      ingredient = { ...ingredient, uuid: crypto.randomUUID()};
      if (ingredient['type'] === 'bun') {
        dispatch(addBun(ingredient as TBun));
      } else {
        dispatch(addIngredient(ingredient))
      }
    }
  });

  useEffect(() => {
    if (orderNumber) {
      dispatch(cleanDraggedIngredients());
      dispatch(cleanCounters());
    }
  }, [dispatch, orderNumber]);

  useEffect(() => {
    setSum((draggedIngredients.reduce((prevVal, val) => prevVal + val['price'], 0)) + bun['price'] * 2)
  }, [draggedIngredients, bun])

  function createOrder(): void {
    if (!localStorage.getItem('refreshToken')) {
      navigate(loginRoute);
    } else {
      const ingredientIds = draggedIngredients.map(i => i['_id']);
      if (bun && bun['_id']) {
        ingredientIds.unshift(bun['_id']);
        ingredientIds.push(bun['_id']);
      }
      dispatch(fetchOrder(ingredientIds));
      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={`${burgerConstructorStyles.container} pl-4 pr-4`}>
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
    </div>
  )
}

export default BurgerConstructor;
