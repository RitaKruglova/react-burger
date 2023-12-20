import formStyles from './form.module.css';
import PropTypes from 'prop-types';

function Form({ children, title }) {
  return (
    <div className={formStyles.container}>
      <h2 className={`${formStyles.title} text text_type_main-medium`}>{title}</h2>
      <form className={formStyles.form}>
        {children}
      </form>
    </div>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

export default Form;