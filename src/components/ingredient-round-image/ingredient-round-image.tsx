import ingredientRoundImageStyles from './ingredient-round-image.module.css';
import { FC } from 'react';

interface IIngredientRoundImageProps {
  isOrderPlace: boolean;
  image: string;
  name: string;
  index?: number;
}

const IngredientRoundImage: FC<IIngredientRoundImageProps> = ({ isOrderPlace, image, name, index}) => {
  const style = isOrderPlace ? { zIndex: 5 - (index || 0) } : undefined;

  return (
    <div className={ingredientRoundImageStyles.container}>
      <img
        className={ingredientRoundImageStyles.image}
        src={image}
        alt={name}
        style={style}
      />
    </div>
)
}

export default IngredientRoundImage;