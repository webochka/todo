// Core
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

// Elements
import { Tag } from '../../../../elements/tag';

// Hooks
import { useTaskManager } from '../../hooks/useTaskManager';

export const Task = (props) => {
    const {
        title,
        deadline,
        tag,
        completed,
        selected
    } = props.source;

    const { selectTask } = useTaskManager();

    const taskCX = cx('task', [
        {completed: completed},
        {selected: selected}
    ]);

    const deadlineJSX = moment(deadline)
        .format('LL');

    const selectCurrentTask = () => {
        selectTask(props.source);
    };

    const clickHandler = () => {
        selectCurrentTask();
    };

    return (
        <div className={taskCX} onClick={clickHandler}>
            <span className="title">
                {title}
            </span>
            <div className="meta">
                <span className="deadline">
                    {deadlineJSX}
                </span>
                <Tag type={tag} />
            </div>
        </div>
    );
};
