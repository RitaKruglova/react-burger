import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/modal/modal';
import { feedRoute, profileOrderRoute, profileRoute } from '../constants/constants';
import OrderInfo from '../components/order-info/order-info';
import orderPageStyles from './order-page.module.css';

const OrderPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let state = location.state;
  console.log(location.pathname)

  function handleClose(): void {
    console.log(location.pathname.startsWith(profileRoute))
    if (location.pathname.startsWith(profileRoute)) {
      navigate(profileOrderRoute)
    } else {
      navigate(feedRoute);
    }
  }

  return (
    state?.backgroundLocation ?
      <Modal
        isOrderDetails={false}
        isOrderPage={true}
        title='#034535'
        closeModal={handleClose}
      >
        <OrderInfo />
      </Modal>
    :
      <div className={orderPageStyles.container}>
        <h4 className="text text_type_digits-default">#034535</h4>
        <OrderInfo />
      </div>
  )
}

export default OrderPage;