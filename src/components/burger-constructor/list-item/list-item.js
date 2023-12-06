import listItemStyles from './list-item.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../../store/slices/ingredientsSlice';

function ListItem({ id, place, text, price, thumbnail }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeIngredient({id}))
  }

  return (
    <li className={`mr-2 ${place === 'top' ? 'ml-8 mb-4 ' : ''}${place === 'middle' ? `${listItemStyles.item} mb-4 ` : ''}${place === 'bottom' ? 'ml-8 mt-4' : ''}`}>
      {place === 'middle'
        ?
        <>
          <div className="mr-2">
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={text}
            price={price}
            thumbnail={thumbnail}
            handleClose={handleDelete}
          />
        </>
        :
        <ConstructorElement
          type={place}
          isLocked="true"
          text={`${text} ${place === 'top' ? '(верх)' : '(низ)'}`}
          price={price}
          thumbnail={thumbnail}
        />
      }
    </li>
  )
}

ListItem.propTypes = {
  id: PropTypes.string,
  place: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}

export default ListItem;