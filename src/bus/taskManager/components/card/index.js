// Core
import React from 'react';
import cx from 'classnames';

// Components
import { Checklist } from '../checklist';

// Elements
import { Tag } from '../../../../elements/tag';
import { CustomInput } from '../../../../elements/customInput';
import { CustomTextarea } from '../../../../elements/customTextarea';
import { CustomDatePicker } from '../../../../elements/customDatePicker';

// Hooks
import { useCard } from '../../hooks/useCard';

// Other
import { availableTags } from '../../availableTags';

export const Card = () => {
    const {
        values,
        selectedTask,
        setTag,
        removeCurrentTask,
        handleResetForm,
        completeTask,
        empty,
        saveFullTask,
        getFieldProps,
        isFormBlocked,
        setFieldValue,
        errors,
        isValid
    } = useCard();

    const tagsJSX = selectedTask && availableTags.map((tag, index) => (
        <Tag
            key={String(index)}
            type={tag}
            selected={values && values.tag === tag}
            cb={setTag}
        />
    ));

    const buttonCompleteTaskCX = cx('button-complete-task', {
        completed: values && values.completed
    });

    const removeButtonJSX = !empty && (
        <button className="button-remove-task" onClick={removeCurrentTask}/>
    );

    const checklistJSX = values && (
        <Checklist setFieldValue={setFieldValue} isParentFormChanged={isFormBlocked} />
    );

    const titleErrorsJSX = errors.title && (
        <p className="errorMessage">
            {errors.title}
        </p>
    );

    const tagErrorsJSX = errors.tag && (
        <p className="errorMessage">
            {errors.tag}
        </p>
    );

    const subTaskErrorsJSX = errors.checklist && (
        typeof errors.checklist === 'string' ? (
            <p className="errorMessage">
                {errors.checklist}
            </p>
        ) : errors.checklist.map((error, index) => (
            <p className="errorMessage" key={String(index)}>
                {error}
            </p>
        ))
    );

    const taskCardJSX = selectedTask && (
        <div className="task-card">
            <div className="head">
                <button className={buttonCompleteTaskCX} onClick={completeTask}>
                    Mark as complete
                </button>
                {removeButtonJSX}
            </div>
            <div className="content">
                <CustomInput
                    name="title"
                    cx="title"
                    type="text"
                    placeholder="Task title"
                    {...getFieldProps('title')}
                />
                <CustomDatePicker
                    type="text"
                    name="deadline"
                    label="Due to"
                    setFieldValue={setFieldValue}
                    {...getFieldProps('deadline')}
                />
                <CustomTextarea
                    name="description"
                    cx="description"
                    label="Description"
                    placeholder="Describe your event"
                    {...getFieldProps('description')}
                />
                {checklistJSX}
                <div className="tags">
                    {tagsJSX}
                </div>
                <div className="errors">
                    {titleErrorsJSX}
                    {tagErrorsJSX}
                    {subTaskErrorsJSX}
                </div>
                <div className="form-controls">
                    <button className="button-reset-task" onClick={handleResetForm} disabled={isFormBlocked}>Reset</button>
                    <button className="button-save-task" onClick={saveFullTask} disabled={isFormBlocked || !isValid}>Save</button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {taskCardJSX}
        </>
    );
};
