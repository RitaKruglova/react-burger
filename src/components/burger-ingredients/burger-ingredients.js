import { useMemo, useRef, useEffect } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerNavigation from './burger-navigation/burger-navigation';
import IngredientList from './ingredient-list/ingredient-list';
import Ingredient from './ingredient/ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { bunsType, fillingsType, saucesType } from '../../constants/constants';
import { setCurrentTab } from '../../store/slices/tabsSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { dataIngredients, currentTab } = useSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients,
    currentTab: store.tabs.currentTab
  }));

  const containerRef = useRef();
  const bunsRef = useRef();
  const fillingsRef = useRef();
  const saucesRef = useRef();

  const bunsTop = 0;
  const saucesTop = useMemo(() => bunsRef.current?.getBoundingClientRect()?.height, [bunsRef.current]);
  const fillingsTop = useMemo(() => saucesTop + saucesRef.current?.getBoundingClientRect()?.height, [saucesRef.current, saucesTop]);

  useEffect(() => {
    const container = containerRef?.current;
    function handleScroll() {
      if (container.scrollTop < saucesTop) {
        dispatch(setCurrentTab(bunsType));
      } else if (container.scrollTop >= saucesTop && containerRef.current.scrollTop < fillingsTop) {
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

  function setTab(tab) {
    console.log(tab)
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
    container.scrollTo({
      top: ingredientsTop,
      behavior: 'smooth'
    });
  }

  const buns = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'bun'), [dataIngredients]);
  const sauce = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'sauce'), [dataIngredients]);
  const main = useMemo(() => dataIngredients.filter(ingredient => ingredient.type === 'main'), [dataIngredients]);

  function showDetails(ingredient) {
    navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location } });
  }
  
  return (
    <section className={`${burgerIngredientsStyles.container} mt-10`}>
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
    </section>
  )
}

export default BurgerIngredients;

