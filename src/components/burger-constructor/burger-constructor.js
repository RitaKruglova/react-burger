import burgerConstructorStyles from './burger-constructor.module.css';
import { useState } from 'react';
import ListItem from './list-item/list-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyIconPath from '../../images/currency-icon.svg';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import { ingredientType } from '../../utils/types';

function BurgerConstructor({ dataIngredients, setIsOrderDetailsModalOpen, isOrderDetailsModalOpen }) {
  const [ingredients, setIngredients] = useState(dataIngredients.filter(i => i['type'] !== 'bun'));
  const [sum, setSum] = useState((ingredients.reduce((prevVal, val) => prevVal + val['price'], 0)) + dataIngredients[0]['price'] * 2);

  function createOrder() {
    setIsOrderDetailsModalOpen(true);
  }

  return (
    <section className={`${burgerConstructorStyles.container} pl-4 pr-4`}>
      <ul className={`${burgerConstructorStyles.list} mt-25`}>
        <ListItem
          place="top"
          text={dataIngredients[0]['name']}
          price={dataIngredients[0]['price']}
          thumbnail={dataIngredients[0]['image']}
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
            text={dataIngredients[0]['name']}
            price={dataIngredients[0]['price']}
            thumbnail={dataIngredients[0]['image']}
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
          title="034536"
        >
          <OrderDetails />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.arrayOf(
    PropTypes.shape(ingredientType)
  ).isRequired,
  setIsOrderDetailsModalOpen: PropTypes.func.isRequired,
  isOrderDetailsModalOpen: PropTypes.any
}

export default BurgerConstructor;