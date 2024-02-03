import { useAppSelector } from "../utils/reduxHooks";
import { useMemo } from 'react';
import { TCurrentOrder } from "../utils/types";

export const useCurrentOrder = (orderNumber: number): TCurrentOrder => {
  const { dataIngredients, allOrders } = useAppSelector(store => ({
    dataIngredients: store.ingredients.dataIngredients,
    allOrders: store.webSocket.allOrders
  }));

  let currentOrder = allOrders.find(order => order.number === orderNumber) || {
    _id: '',
    number: 0,
    name: '',
    status: 'created',
    ingredients: [],
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
  }

  const ingredients = useMemo(() => {
    const result = [];
    for (let id of currentOrder.ingredients) {
      const ingredient = dataIngredients.find(i => id === i._id);
      if (ingredient !== undefined) {
        result.push(ingredient);
      }
    }
    return result;
  }, [dataIngredients]);

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

  return {
    number: currentOrder.number,
    name: currentOrder.name,
    statusText,
    ingredients,
    date,
    price
  }
}