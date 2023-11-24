import nutritionalValueStyles from './nutritional-value.module.css';
import PropTypes from 'prop-types';

function NutritionalValue({ title, value }) {
  return (
    <li className={nutritionalValueStyles.container}>
      <h6 className={`${nutritionalValueStyles.title} text text_type_main-default mb-2`}>{title}</h6>
      <p className={`${nutritionalValueStyles.value} text text_type_digits-default`}>{value}</p>
    </li>
  )
}

NutritionalValue.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default NutritionalValue;