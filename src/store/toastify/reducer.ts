import { ADD_TOASTIFY } from '../action-types';

export interface IToastifyAction {
  type: string;
  payload: string;
}

export interface IToastifyInitialState {
  messages: string[];
}

const initialState = {
  messages: [],
};

const toastifyReducer = (state: IToastifyInitialState = initialState, action: IToastifyAction) => {
  switch (action.type) {
    case ADD_TOASTIFY:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };

    default:
      return state;
  }
};

export default toastifyReducer;
