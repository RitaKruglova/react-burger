import React, { FC, ReactNode } from 'react';
import formStyles from './form.module.css';

interface IFormProps {
  children: ReactNode;
  title?: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isProfilePlace: boolean;
}

const Form: FC<IFormProps> = ({ children, title, handleSubmit, isProfilePlace }) => {
  return (
    <div className={formStyles.container}>
      {!isProfilePlace && <h2 className={`${formStyles.title} text text_type_main-medium`}>{title}</h2>}
      <form className={formStyles.form} onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  )
}

export default Form;