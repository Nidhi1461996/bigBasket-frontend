export const dispatchIncrementAction = basket => ({
  type: 'INCREMENT',
  payload: basket,
});

export const dispatchDecrementAction = basket => ({
  type: 'DECREMENT',
  payload: basket,
});
