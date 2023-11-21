import burgerConstructorStyles from './burger-constructor.module.css';
import data from '../../utils/data';
import { useState } from 'react';
import ListItem from './list-item/list-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import currencyIconPath from '../../images/currency-icon.svg';

function BurgerConstructor() {
  const [ingredients, setIngredients] = useState(data.filter(i => i['type'] !== 'bun'));
  const [sum, setSum] = useState((ingredients.reduce((prevVal, val) => prevVal + val['price'], 0)) + data[0]['price'] * 2);

  return (
    <section className={`${burgerConstructorStyles.container} pl-4 pr-4`}>
      <ul className={`${burgerConstructorStyles.list} mt-25`}>
        <ListItem
          place="top"
          text={data[0]['name']}
          price={data[0]['price']}
          thumbnail={data[0]['image']}
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
            text={data[0]['name']}
            price={data[0]['price']}
            thumbnail={data[0]['image']}
          />
      </ul>
      <div className={`${burgerConstructorStyles.order} mt-10 mr-6`}>
        <div className={`${burgerConstructorStyles.cost} mr-10`}>
          <p className={`${burgerConstructorStyles.sum} text text_type_digits-medium mr-2`}>{sum}</p>
          <img src={currencyIconPath} alt="Иконка валюты" />
        </div>
        <Button htmlType="button" type="primary" size="medium" >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;