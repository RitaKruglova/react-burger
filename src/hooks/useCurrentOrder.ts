import { useDispatch } from "react-redux";
import { useAppSelector } from "../utils/reduxHooks";
import { useMemo, useEffect } from 'react';
import { setCurrentOrder } from "../store/slices/orderSlice";

export const useCurrentOrder = ({ orderNumber }: { orderNumber: string }): void => {
  const dispatch = useDispatch();

  const { dataIngredients, allOrders } = useAppSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients,
    allOrders: store.webSocket.allOrders
  }));

  const currentOrder = allOrders.filter(order => order.number === Number(orderNumber))[0];

  const ingredients = useMemo(() => {
    const result = [];
    for (let id of currentOrder.ingredients) {
      const ingredient = dataIngredients.find(i => id === i._id);
      if (ingredient !== undefined) {
        result.push(ingredient);
      }
    }
    return result;
  }, [currentOrder, dataIngredients]);

  const date = new Date(Date.parse(currentOrder.createdAt));

  let statusText: string;

  switch (currentOrder.status) {
    case 'pending':
      statusText = 'Готовится';
      break;
    case 'done':
      statusText = 'Выполнен';
      break;
    case 'canceled':
      statusText = 'Отменен';
      break;
    default:
      statusText = 'Создан';
  }

  const price: number = ingredients.reduce((prevI, i) => prevI + i.price, 0);

  useEffect(() => {
    dispatch(setCurrentOrder({
      number: currentOrder.number,
      name: currentOrder.name,
      statusText,
      ingredients,
      date,
      price
    }))
  }, [dispatch, currentOrder, allOrders])
}