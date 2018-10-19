export const addName = (name, hasNameProvided) => {
  console.log('in action', name);
  return {
    type: 'ADD_NAME',
    payload: {
      name,
      hasNameProvided
    }
  };
};
