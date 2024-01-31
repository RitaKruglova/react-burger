import ingredientRoundImageStyles from './ingredient-round-image.module.css';
import { FC } from 'react';

interface IIngredientRoundImageProps {
  image: string;
  name: string;
  index: number;
}

const IngredientRoundImage: FC<IIngredientRoundImageProps> = ({ image, name, index}) => {
  return (
    <img
      className={ingredientRoundImageStyles.image}
      src={image}
      alt={name}
      style={{zIndex: 5 - index}}
    />
)
}

export default IngredientRoundImage;