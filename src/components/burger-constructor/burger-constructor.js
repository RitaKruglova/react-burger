import burgerConstructorStyles from './burger-constructor.module.css';
import { useState } from 'react';
import ListItem from './list-item/list-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyIconPath from '../../images/currency-icon.svg';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import { api } from '../../utils/Api';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { addBun, addIngredient } from '../../store/slices/ingredientsSlice';

function BurgerConstructor({ setIsOrderDetailsModalOpen, isOrderDetailsModalOpen }) {
  const dispatch = useDispatch();
  const { dataIngredients, draggedIngredients, bun } = useSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients,
    draggedIngredients: store.ingredients.draggedIngredients,
    bun: store.ingredients.bun
  }));

  const [ingredients, setIngredients] = useState(dataIngredients.filter(i => i['type'] !== 'bun'));
  const [buns, setBuns] = useState(dataIngredients.filter(i => i['type'] === 'bun'));
  const [currentBun, setCurrentBun] = useState(buns.length > 0 ? buns[Math.floor(Math.random() * buns.length)] : {});
  const [sum, setSum] = useState((ingredients.reduce((prevVal, val) => prevVal + val['price'], 0)) + currentBun['price'] * 2);
  const [orderNumber, setOrderNumber] = useState(null);

  function handleDrop(item) {

  }

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      if (ingredient['type'] === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient))
      }
    }
  })

  function createOrder() {
    api.createOrder(draggedIngredients.map(i => i['_id']).concat(currentBun['_id']))
      .then(data => setOrderNumber(data.order.number))
      .catch(err => console.log(err));
    setIsOrderDetailsModalOpen(true);
  }

  return (
    <section className={`${burgerConstructorStyles.container} pl-4 pr-4`}>
      <ul className={burgerConstructorStyles.list} ref={dropRef}>
        <ListItem
          place="top"
          text={bun['name']}
          price={bun['price']}
          thumbnail={bun['image']}
        />
        <div className={burgerConstructorStyles.scroll} >
          {
            draggedIngredients.map(ingredient => (
              <ListItem
                key={ingredient['_id']}
                id={ingredient['_id']}
                place="middle"
                text={ingredient['name']}
                price={ingredient['price']}
                thumbnail={ingredient['image']}
              />
            ))
          }
        </div>
          <ListItem
            place="bottom"
            text={bun['name']}
            price={bun['price']}
            thumbnail={bun['image']}
          />
      </ul>
      <div className={`${burgerConstructorStyles.order} mt-10 mr-6`}>
        <div className={`${burgerConstructorStyles.cost} mr-10`}>
          <p className={`${burgerConstructorStyles.sum} text text_type_digits-medium mr-2`}>{sum}</p>
          <img src={currencyIconPath} alt="Иконка валюты" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsModalOpen &&
        <Modal
          isOrderDetails={true}
          setIsModalOpen={setIsOrderDetailsModalOpen}
          title={orderNumber}
        >
          <OrderDetails />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  setIsOrderDetailsModalOpen: PropTypes.func.isRequired,
  isOrderDetailsModalOpen: PropTypes.any
}

export default BurgerConstructor;