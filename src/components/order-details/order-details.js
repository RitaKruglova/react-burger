import orderDetailsStyles from './order-details.module.css';
import doneImagePath from '../../images/done.svg';

function OrderDetails() {
  return (
    <>
      <h5 className={`${orderDetailsStyles.title} text text_type_main-medium mt-8`}>идентификатор заказа</h5>
      <img className="mt-15" src={doneImagePath} alt="Иконка успешного заказа" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles.paragraph} text text_type_main-default mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;