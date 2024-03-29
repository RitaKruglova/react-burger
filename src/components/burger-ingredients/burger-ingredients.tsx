import { useMemo, useRef, useEffect, FC } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';
import IngredientList from './ingredient-list/ingredient-list';
import Ingredient from './ingredient/ingredient';
import { bunsType, fillingsType, saucesType } from '../../constants/constants';
import { setCurrentTab } from '../../store/slices/tabsSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../utils/reduxHooks';
import { TIngredient } from '../../utils/types';
import { getCurrentTab, getDataIngredients } from '../../utils/selectors';

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dataIngredients = useAppSelector(getDataIngredients);
  const currentTab = useAppSelector(getCurrentTab);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const fillingsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);

  const bunsTop: number = 0;
  const saucesTop: number = useMemo(() => 
    bunsRef.current
      ? bunsRef.current?.getBoundingClientRect()?.height
      : 0
      , [bunsRef.current]);
  const fillingsTop: number = useMemo(() => 
    saucesTop && saucesRef.current?.getBoundingClientRect()?.height
      ? saucesTop + saucesRef.current.getBoundingClientRect().height
      : 0, 
    [saucesRef.current, saucesTop]
  );

  useEffect(() => {
    const container = containerRef?.current;

    if (!container) return;

    function handleScroll() {
      if (!container) return;

      if (container.scrollTop < saucesTop) {
        dispatch(setCurrentTab(bunsType));
      } else if (container.scrollTop >= saucesTop && container.scrollTop < fillingsTop) {
        dispatch(setCurrentTab(saucesType));
      } else {
        dispatch(setCurrentTab(fillingsType));
      }
    }

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    }
  }, [dispatch, currentTab, fillingsTop, saucesTop]);

  function setTab(tab: string) {
    dispatch(setCurrentTab(tab));
    let ingredientsTop;
    if (tab === bunsType) {
      ingredientsTop = bunsTop;
    } else if (tab === saucesType) {
      ingredientsTop = saucesTop;
    } else {
      ingredientsTop = fillingsTop;
    }
    const container = containerRef?.current;

    if (!container) return;

    container.scrollTo({
      top: ingredientsTop,
      behavior: 'smooth'
    });
  }

  const buns = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'bun'), [dataIngredients]);
  const sauce = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'sauce'), [dataIngredients]);
  const main = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'main'), [dataIngredients]);

  function showDetails(ingredient: TIngredient) {
    navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location } });
  }
  
  return (
    <div className={`${burgerIngredientsStyles.container} mt-10`}>
      <h1 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <BurgerNavigation  handleClick={setTab}/>
      <div className={`${burgerIngredientsStyles.ingredients} mt-10`} ref={containerRef}>
        <IngredientList title={bunsType} forwardRef={bunsRef}>
          {buns.map((ingredient) => (
            <Ingredient key={ingredient['_id']} ingredient={ingredient} onClick={() => showDetails(ingredient)} />
          ))}
        </IngredientList>
        <IngredientList title={saucesType} forwardRef={saucesRef}>
          {sauce.map((ingredient) => (
            <Ingredient key={ingredient['_id']} ingredient={ingredient} onClick={() => showDetails(ingredient)} />
          ))}
        </IngredientList>
        <IngredientList title={fillingsType} forwardRef={fillingsRef}>
          {main.map((ingredient) => (
            <Ingredient key={ingredient['_id']} ingredient={ingredient} onClick={() => showDetails(ingredient)} />
          ))}
        </IngredientList>
      </div>
    </div>
  )
}

export default BurgerIngredients;

