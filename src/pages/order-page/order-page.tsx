import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import { feedRoute, profileOrderRoute, profileRoute } from '../../constants/constants';
import OrderInfo from '../../components/order-info/order-info';
import orderPageStyles from './order-page.module.css';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';
import { setCurrentOrder } from '../../store/slices/orderSlice';

const OrderPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { number } = useParams<{ number: string }>();

  let state = location.state;

  function handleClose(): void {
    dispatch(setCurrentOrder(null));
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
        title={`#${number}`}
        closeModal={handleClose}
      >
        <OrderInfo orderNumber={number} />
      </Modal>
    :
      <div className={orderPageStyles.container}>
        <h4 className="text text_type_digits-default">{`#${number}`}</h4>
        <OrderInfo orderNumber={number}/>
      </div>
  )
}

export default OrderPage;