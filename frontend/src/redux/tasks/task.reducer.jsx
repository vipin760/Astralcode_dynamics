import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_EDIT_FAIL,
  TASK_EDIT_REQUEST,
  TASK_EDIT_SUCCESS,
  TASK_GET_FAIL,
  TASK_GET_REQUEST,
  TASK_GET_SUCCESS,
  TASK_PRIORITY_FAIL,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
} from "./task.constants";

export const TaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, taskData: action.payload };
    case TASK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TASK_GET_REQUEST:
      return { loading: true };
    case TASK_GET_SUCCESS:
      return { loading: false, taskData: action.payload };
    case TASK_GET_FAIL:
      return { loading: false, error: action.payload };
    case TASK_EDIT_REQUEST:
      return { loading: true };
    case TASK_EDIT_SUCCESS:
      return { loading: false, taskData: action.payload };
    case TASK_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case TASK_UPDATE_REQUEST:
      return { loading: true };
    case TASK_UPDATE_SUCCESS:
      return { loading: false, taskData: action.payload };
    case TASK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, taskData: action.payload };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASK_PRIORITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
