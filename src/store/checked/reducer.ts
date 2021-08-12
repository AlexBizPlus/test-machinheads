import { SET_CHECKED_AUTHOR, CLEAR_CHECKED, SET_CHECKED_TAGS } from '../action-types';

export interface ICheckedAction {
  type: string;
  payload: {
    [key: string]: string[] | number[] | number | null;
  };
}

export interface ICheckedInitialState {
  author: null | number;
  tags: string[] | number[];
}

const initialState = {
  author: null,
  tags: [],
};

const checkedReducer = (state = initialState, action: ICheckedAction) => {
  switch (action.type) {
    case SET_CHECKED_AUTHOR:
      return Object.assign({}, { ...state, author: action.payload.author });

    case SET_CHECKED_TAGS:
      return Object.assign({}, { ...state, tags: action.payload.tags });

    case CLEAR_CHECKED:
      return initialState;

    default:
      return state;
  }
};

export default checkedReducer;
