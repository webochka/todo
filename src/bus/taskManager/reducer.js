// Types
import { types } from './types';

// Helpers
import {
    transformTaskFromUtcFormat,
    sortTasksByDate
} from '../../helpers';

const initialState = {
    tasks: null,
    isLoading: false,
    error: null,
    selectedTask: null
};

export const taskManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TASK_MANAGER_SELECT_TASK:
            return {
                ...state,
                selectedTask: action.payload && transformTaskFromUtcFormat(action.payload)
            }
        case types.TASK_MANAGER_START_FETCHING:
            return {
                ...state,
                isLoading: true
            }
        case types.TASK_MANAGER_STOP_FETCHING:
            return {
                ...state,
                isLoading: false
            }
        case types.TASK_MANAGER_FILL_TASKS:
            return {
                ...state,
                error: null,
                tasks: action.payload
                    .sort(sortTasksByDate)
                    .map(transformTaskFromUtcFormat)
            }
        default:
            return state;
    }
};
