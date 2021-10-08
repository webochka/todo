// Core
import React from 'react';
import cx from 'classnames';

// Hooks
import { useChecklist } from '../../hooks/useChecklist';

export const Checklist = ({setFieldValue, isParentFormChanged}) => {
    const {
        dynamicFields,
        addMore,
        getFieldProps,
        completeTask,
        completeDynamicTask,
        subTasks
    } = useChecklist({setFieldValue, isParentFormChanged});

    const subTasksJSX = subTasks && subTasks.map((subTask, index) => {
        const currentInputName = `subTasks.${index}`;
        const currentInput = getFieldProps(currentInputName);
        const currentInputTitle = currentInput && currentInput.value;
        const currentCompletedTasks = getFieldProps('completedTasks').value;
        const subTaskCX = cx('sub-task', {
            completed: currentCompletedTasks && currentCompletedTasks.includes(subTask.hash)
        });

        return (
            <div className={subTaskCX} key={subTask.hash || String(index)}>
                <button onClick={() => completeTask(subTask.hash)} />
                <input
                    type="text"
                    name={currentInputName}
                    value={currentInputTitle || ''}
                    onChange={currentInput.onChange}
                    onBlur={currentInput.onBlur}
                    ref={subTask.ref}
                />
            </div>
        )
    });

    const dynamicFieldsJSX = dynamicFields.map((subTask, index) => {
        const expectedIndex = subTasks ? (subTasks.length - 1) + index + 1 : index;
        const currentInputName = `subTasks.${expectedIndex}`;
        const currentInput = getFieldProps(currentInputName);
        const currentInputTitle = currentInput && currentInput.value;
        const currentCompletedTasks = getFieldProps('completedDynamicTasks').value;
        const subTaskCX = cx('sub-task', {
            completed: currentCompletedTasks && currentCompletedTasks.includes(index)
        });

        return (
            <div className={subTaskCX} key={String(index)}>
                <button onClick={() => completeDynamicTask(index)} />
                <input
                    type="text"
                    name={currentInputName}
                    value={currentInputTitle || ''}
                    onChange={currentInput.onChange}
                    onBlur={currentInput.onBlur}
                    ref={subTask.ref}
                />
            </div>
        )
    });

    return (
        <div className="checklist">
            <span className="label">Checklist</span>
            <div className="sub-tasks">
                {subTasksJSX}
                {dynamicFieldsJSX}
                <div className="sub-task">
                    <button />
                    <input
                        type="text"
                        placeholder="Add more"
                        onChange={addMore}
                    />
                </div>
            </div>
        </div>
    );
};
