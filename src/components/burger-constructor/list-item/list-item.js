import listItemStyles from './list-item.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function ListItem({ place, text, price, thumbnail }) {
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

export default ListItem;