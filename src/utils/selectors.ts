import { TBun, TError, TIngredient, TOrder, TOrderNumber, TRootState, TTotal, TUser } from "./types";

export const getDataIngredients = (store: TRootState): TIngredient[] => store.ingredients.dataIngredients;

export const getAllOrders = (store: TRootState): TOrder[] => store.webSocket.allOrders;

export const getMyOrders = (store: TRootState): TOrder[] => store.webSocket.myOrders;

export const getIngredientsError = (store: TRootState): TError => store.ingredients.error;

export const getDraggedIngredients = (store: TRootState): TIngredient[] => store.ingredients.draggedIngredients;

export const getBun = (store: TRootState): TBun => store.ingredients.bun;

export const getOrderNumber = (store: TRootState): TOrderNumber => store.order.orderNumber;

export const getOrderError = (store: TRootState): TError => store.order.error;

export const getCurrentTab = (store: TRootState): string => store.tabs.currentTab;

export const getCurrentIngredient = (store: TRootState): null | TIngredient => store.ingredients.currentIngredient;

export const getTotal = (store: TRootState): TTotal => store.webSocket.total;

export const getCurrentUser = (store: TRootState): TUser => store.form.currentUser;

export const getValues = (store: TRootState): Record<string, string> => store.form.values;

export const getIsLoading = (store: TRootState): boolean => store.loading.isLoading;

export const getIsPasswordVisible = (store: TRootState): boolean => store.form.isPasswordVisible;