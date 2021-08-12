import { ICheckedAction } from '../checked/reducer';
import { SET_CHECKED_AUTHOR, CLEAR_CHECKED, SET_CHECKED_TAGS } from '../action-types';

export const setCheckedAuthor = (payload: ICheckedAction['payload']) => ({ type: SET_CHECKED_AUTHOR, payload });
export const setCheckedTags = (payload: ICheckedAction['payload']) => ({ type: SET_CHECKED_TAGS, payload });
export const clearChecked = () => ({ type: CLEAR_CHECKED, payload: {} });
