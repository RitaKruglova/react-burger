import listItemStyles from './list-item.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../../store/slices/ingredientsSlice';
import { ingredientType } from '../../../utils/types';
import { useDrag } from 'react-dnd';

function ListItem({ place, ingredient }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeIngredient(ingredient))
  }

    const [, dragRef] = useDrag({
      type: 'ingredient',
      item: ingredient
    });
  

  return (
    <li className={`mr-2 ${place === 'top' ? 'ml-8 mb-4 ' : ''}${place === 'middle' ? `${listItemStyles.item} mb-4 ` : ''}${place === 'bottom' ? 'ml-8 mt-4' : ''}`}>
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
          thumbnail={ingredient['image']}
        />
      }
    </li>
  )
}
console.log(ingredientType);
ListItem.propTypes = {
  place: PropTypes.string.isRequired,
  ingredient: ingredientType.isRequired
}

export default ListItem;