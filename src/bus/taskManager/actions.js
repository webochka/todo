// Core
import { batch } from 'react-redux'

// Types
import { types } from './types';

// Api
import { api } from '../../api';

export const taskManagerActions = Object.freeze({
    // Sync
    selectTask: (payload) => {
        return {
            type: types.TASK_MANAGER_SELECT_TASK,
            payload
        };
    },
    startFetching: () => {
        return {
            type: types.TASK_MANAGER_START_FETCHING
        }
    },
    stopFetching: () => {
        return {
            type: types.TASK_MANAGER_STOP_FETCHING
        }
    },
    setFetchingError: (error) => {
        return {
            type: types.TASK_MANAGER_SET_FETCHING_ERROR,
            error: true,
            payload: error
        }
    },
    fillTasks: (payload) => {
        return {
            type: types.TASK_MANAGER_FILL_TASKS,
            payload
        }
    },
    // Async
    fetchTasksAsync: () => async (dispatch, getState) => {
        dispatch({
            type: types.TASK_MANAGER_FETCH_TASKS_ASYNC
        });

        dispatch(taskManagerActions.startFetching());

        const response = await api.todo.fetch();

        if (response.status === 200) {
            const { data } = await response.json();

            dispatch(taskManagerActions.fillTasks(data));
        } else {
            const error = {
                status: response.status
            };

            dispatch(taskManagerActions.setFetchingError(error));
        }

        dispatch(taskManagerActions.stopFetching());
    },
    removeTaskAsync: (payload) => async (dispatch) => {
        dispatch({
            type: types.TASK_MANAGER_REMOVE_TASK_ASYNC,
            payload
        });

        dispatch(taskManagerActions.startFetching());

        const response = await api.todo.remove(payload);

        if (response.status === 204) {
            batch(() => {
                dispatch(taskManagerActions.selectTask(null));
                dispatch(taskManagerActions.fetchTasksAsync());
            });
        } else {
            const error = {
                status: response.status
            };

            dispatch(taskManagerActions.setFetchingError(error));
        }

        dispatch(taskManagerActions.stopFetching());
    },
    createTaskAsync: (payload) => async (dispatch) => {
        dispatch({
            type: types.TASK_MANAGER_CREATE_TASK_ASYNC,
            payload
        });

        dispatch(taskManagerActions.startFetching());

        const response = await api.todo.create(payload);

        if (response.status === 201) {
            batch(() => {
                dispatch(taskManagerActions.selectTask(null));
                dispatch(taskManagerActions.fetchTasksAsync());
            });
        } else {
            const error = {
                status: response.status
            };

            dispatch(taskManagerActions.setFetchingError(error));
        }

        dispatch(taskManagerActions.stopFetching());
    },
    updateTaskAsync: (payload) => async (dispatch) => {
        dispatch({
            type: types.TASK_MANAGER_UPDATE_TASK_ASYNC,
            payload
        });

        dispatch(taskManagerActions.startFetching());

        const {
            hash,
            title,
            description,
            completed,
            tag,
            checklist,
            deadline
        } = payload;

        const response = await api.todo.update(hash, {
            title,
            description,
            completed,
            tag,
            checklist,
            deadline
        });

        if (response.status === 200) {
            batch(() => {
                dispatch(taskManagerActions.selectTask(null));
                dispatch(taskManagerActions.fetchTasksAsync());
            });
        } else {
            const error = {
                status: response.status
            };

            dispatch(taskManagerActions.setFetchingError(error));
        }

        dispatch(taskManagerActions.stopFetching());
    }
});
