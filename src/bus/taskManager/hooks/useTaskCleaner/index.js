// Core
import { useDispatch } from 'react-redux';

// Actions
import { taskManagerActions } from '../../actions';

export const useTaskCleaner = () => {
    const dispatch = useDispatch();

    const removeTask = (hash) => {
        dispatch(taskManagerActions.removeTaskAsync(hash));
    }

    return {
        removeTask
    };
};
