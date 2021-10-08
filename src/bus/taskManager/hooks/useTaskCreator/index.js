// Core
import { useDispatch } from 'react-redux';

// Actions
import { taskManagerActions } from '../../actions';

export const useTaskCreator = () => {
    const dispatch = useDispatch();

    const saveTask = (task) => {
        if (task.hash) {
            dispatch(taskManagerActions.updateTaskAsync(task));
        } else {
            dispatch(taskManagerActions.createTaskAsync(task));
        }
    };

    return {
        saveTask
    };
};
