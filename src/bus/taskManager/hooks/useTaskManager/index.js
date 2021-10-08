// Core
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { taskManagerActions } from '../../actions';

// Other
import { emptyTaskShape } from '../../emptyTaskShape';

export const useTaskManager = () => {
    const dispatch = useDispatch();

    const {
        tasks,
        isLoading,
        selectedTask
    } = useSelector((state) => state.taskManager);

    const originalTask = tasks
        && selectedTask
        && tasks.find((currentTask) => (
            currentTask.hash === selectedTask.hash
        ));

    useEffect(() => {
        if (!tasks && !isLoading) {
            dispatch(taskManagerActions.fetchTasksAsync());
        }

    }, [dispatch, tasks, isLoading]);

    const selectTask = (task) => {
        dispatch(taskManagerActions.selectTask(task));
    };

    const createEmptyCard = () => {
        dispatch(taskManagerActions.selectTask(emptyTaskShape));
    };

    return {
        tasks,
        selectedTask,
        selectTask,
        isLoading,
        createEmptyCard,
        originalTask
    }
}