// Core
import React from 'react';
import cx from 'classnames';

// Components
import { Task } from '../task';

// Hooks
import { useTaskManager } from '../../hooks/useTaskManager';

export const List = () => {
    const { tasks, isLoading } = useTaskManager();

    const tasksJSX = !isLoading
        && tasks
        && tasks.map((currentTask) => (
            <Task
                key={currentTask.hash}
                source={currentTask}
            />
        ));

    const listCX = cx('list', {
        empty: tasks === null || tasks.length === 0
    });

    return (
      <div className={listCX}>
          <div className="tasks">
              {tasksJSX}
          </div>
      </div>
    )
}