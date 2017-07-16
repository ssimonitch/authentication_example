export default function({ dispatch }) {
  return next => action => {

    // if action does not have payload
    // or no payload.then send it to next middleware
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // make sure the action's promise resolves
    action.payload
      // chain then so promise resolves
      .then(response => {
        // create new action with old type,
        // but replace Promise with response data
        const newAction = { ...action, payload: response };

        // send through reducers again with resolved data
        dispatch(newAction);
      });
  };
}
