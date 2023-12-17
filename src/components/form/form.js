import formStyles from './form.module.css';

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

export default Form;