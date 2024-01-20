import { FC, ReactNode, RefObject } from 'react';
import ingredientListStyles from './ingredient-list.module.css';

interface IIngredientListProps {
  children: ReactNode;
  title: string;
  forwardRef: RefObject<HTMLDivElement>
}

const IngredientList: FC<IIngredientListProps> = ({ children, title, forwardRef }) => {
  return (
    <div ref={forwardRef}>
      <h2 className={`${ingredientListStyles.title} text text_type_main-medium mb-6`}>{title}</h2>
      <ul className={`${ingredientListStyles.list} ml-4 mr-4`}>
        {children}
      </ul>
    </div>
  )
}

export default IngredientList;