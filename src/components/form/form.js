import formStyles from './form.module.css';
import PropTypes from 'prop-types';

function Form({ children, title, handleSubmit }) {
  return (
    <div className={formStyles.container}>
      <h2 className={`${formStyles.title} text text_type_main-medium`}>{title}</h2>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
}

export default Form;