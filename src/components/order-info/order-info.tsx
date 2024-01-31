import orderInfoStyles from './order-info.module.css';
import { FC } from 'react';

const OrderInfo: FC = () => {
  return (
    <div className={orderInfoStyles.container}>
      <p className="text text_type_digits-default">#034533</p>
      <h3 className="text text_type_main-medium">Black Hole Singularity острый бургер</h3>
      <p className={`${orderInfoStyles.status} text text_type_main-default`}>Выполнен</p>
      <h4 className="text text_type_main-medium">Состав:</h4>
      <ul className={orderInfoStyles.list}>
        
      </ul>
    </div>
  )
}

export default OrderInfo;