import burgerStyles from './burger.module.css';
import PropTypes from 'prop-types';

function Burger({ children }) {
  return (
    <section className={burgerStyles.burger}>
      {children}
    </section>
  )
}

Burger.propTypes = {
  children: PropTypes.node
}

export default Burger;