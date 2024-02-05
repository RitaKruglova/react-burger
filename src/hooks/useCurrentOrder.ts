import { useAppSelector } from "../utils/reduxHooks";
import { useMemo } from 'react';
import { TCurrentOrder } from "../utils/types";
import { profileRoute } from "../constants/constants";
import { useLocation } from "react-router-dom";
import { getAllOrders, getDataIngredients, getMyOrders } from "../utils/selectors";

export const useCurrentOrder = (orderNumber: number): TCurrentOrder => {
  const dataIngredients = useAppSelector(getDataIngredients);
  const allOrders = useAppSelector(getAllOrders);
  const myOrders = useAppSelector(getMyOrders);

  const location = useLocation();

  const orders = location.pathname.startsWith(profileRoute) ? myOrders : allOrders;

  let currentOrder = orders.find(order => order.number === orderNumber) || {
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
  }, [dataIngredients, myOrders, allOrders, currentOrder.ingredients]);

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