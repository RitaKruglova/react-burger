import orderDetailsStyles from './order-details.module.css';
import doneImagePath from '../../images/done.svg';

function OrderDetails() {
  return (
    <>
      <h5 className={orderDetailsStyles.title}>идентификатор заказа</h5>
      <img src={doneImagePath} alt="Иконка успешного заказа" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles.paragraph} text text_type_main-small`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;