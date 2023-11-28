import burgerConstructorStyles from './burger-constructor.module.css';
import { useContext, useState } from 'react';
import ListItem from './list-item/list-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyIconPath from '../../images/currency-icon.svg';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import { DataIngredientsContext } from '../../contexts/DataIngredientContext';
import { api } from '../../utils/Api';

function BurgerConstructor({ setIsOrderDetailsModalOpen, isOrderDetailsModalOpen }) {
  const { dataIngredients } = useContext(DataIngredientsContext);
  const [ingredients, setIngredients] = useState(dataIngredients.filter(i => i['type'] !== 'bun'));
  const [buns, setBuns] = useState(dataIngredients.filter(i => i['type'] === 'bun'));
  // временно воспользовалась рандомом пока нет логики
  const [currentBun, setCurrentBun] = useState(buns[Math.floor(Math.random() * buns.length)]);
  const [sum, setSum] = useState((ingredients.reduce((prevVal, val) => prevVal + val['price'], 0)) + currentBun['price'] * 2);
  const [orderNumber, setOrderNumber] = useState(null);

  function createOrder() {
    api.createOrder(ingredients.map(i => i['_id']).concat(currentBun['_id']))
      .then(data => setOrderNumber(data.order.number))
      .catch(err => console.log(err));
    setIsOrderDetailsModalOpen(true);
  }

  return (
    <section className={`${burgerConstructorStyles.container} pl-4 pr-4`}>
      <ul className={`${burgerConstructorStyles.list} mt-25`}>
        <ListItem
          place="top"
          text={currentBun['name']}
          price={currentBun['price']}
          thumbnail={currentBun['image']}
        />
        <div className={burgerConstructorStyles.scroll} >
          {
            ingredients.map(ingredient => (
              <ListItem
                key={ingredient['_id']}
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
            text={currentBun['name']}
            price={currentBun['price']}
            thumbnail={currentBun['image']}
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