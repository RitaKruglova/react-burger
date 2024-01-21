import listItemStyles from './list-item.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../utils/reduxHooks'; 
import { removeIngredient } from '../../../store/slices/ingredientsSlice';
import { TIngredient } from '../../../utils/types';
import { useDrag, useDrop } from 'react-dnd';
import { FC, useRef } from 'react';
import { dropIngredient } from '../../../store/slices/ingredientsSlice';

interface IListItemProps {
  place: 'top' | 'bottom' | 'middle';
  ingredient: TIngredient;
  index?: number;
}

const ListItem: FC<IListItemProps> = ({ place, ingredient, index }) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null);

  function handleDelete(): void {
    dispatch(removeIngredient(ingredient))
  }

  const [{isDrag}, dragRef] = useDrag({
    type: 'list-item',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'list-item',
    hover(ingredient: TIngredient) {
      index && dispatch(dropIngredient({ingredient, index}));
    }
  });

  dropRef(dragRef(ref));

  const opacity = isDrag ? 0 : 1;
  
  return (
    <li className={`mr-2 ${place === 'top' ? 'ml-8 mb-4 ' : ''}${place === 'middle' ? `${listItemStyles.item} mb-4 ` : ''}${place === 'bottom' ? 'ml-8 mt-4' : ''}`} ref={ref} style={{opacity}}>
      {place === 'middle'
        ?
        <>
          <div className="mr-2">
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={ingredient['name']}
            price={ingredient['price']}
            thumbnail={ingredient['image']}
            handleClose={handleDelete}
          />
        </>
        :
        <ConstructorElement
          type={place}
          isLocked={true}
          text={`${ingredient['name']} ${place === 'top' ? '(верх)' : '(низ)'}`}
          price={ingredient['price']}
          thumbnail={ingredient['image'] || ''}
        />
      }
    </li>
  )
}

export default ListItem;