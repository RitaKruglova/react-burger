import listItemStyles from './list-item.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useAppDispatch } from '../../../utils/reduxHooks'; 
import { removeIngredient } from '../../../store/slices/ingredientsSlice';
import { ingredientType } from '../../../utils/types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { dropIngredient } from '../../../store/slices/ingredientsSlice';

function ListItem({ place, ingredient, index }) {
  const dispatch = useAppDispatch();

  const ref = useRef(null);

  function handleDelete() {
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
    hover(ingredient) {
      dispatch(dropIngredient({ingredient, index}));
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
          isLocked="true"
          text={`${ingredient['name']} ${place === 'top' ? '(верх)' : '(низ)'}`}
          price={ingredient['price']}
          {...(ingredient['image'] ? { thumbnail: ingredient['image'] } : {})}
        />
      }
    </li>
  )
}

ListItem.propTypes = {
  place: PropTypes.string.isRequired,
  ingredient: ingredientType.isRequired,
  index: PropTypes.number
}

export default ListItem;