import { FC } from 'react';
import feedStyles from './feed.module.css';
import OrderList from '../components/order-list/order-list';

const Feed: FC = () => {
  return (
    <section className={feedStyles.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={feedStyles.container}>
        <OrderList />
      </div>
    </section>
  )
}

export default Feed;