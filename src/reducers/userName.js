const userName = (state = { hasNameProvided: false, name: '' }, action) => {
  switch (action.type) {
    case 'ADD_NAME':
      return {
        ...state,
        name: action.payload.name,
        hasNameProvided: action.payload.hasNameProvided
      };
    default:
      return state;
  }
};

export default userName;
