import { FC } from 'react';
import feedStyles from './feed.module.css';
import OrderList from '../components/order-list/order-list';
import OrderDashboard from '../components/order-dashboard/order-dashboard';
import { Outlet } from 'react-router-dom';

const Feed: FC = () => {
  return (
    <section className={feedStyles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <div className={feedStyles.container}>
        <OrderList isProfilePlace={false} />
        <OrderDashboard />
      </div>
      <Outlet />
    </section>
  )
}

export default Feed;