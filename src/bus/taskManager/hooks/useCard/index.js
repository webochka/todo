// Core
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as R from 'ramda';
import moment from 'moment';

// Hooks
import { useTaskCleaner } from '../useTaskCleaner';
import { useTaskManager } from '../useTaskManager';
import { useTaskCreator } from '../useTaskCreator';

// Schemas
import { taskSchema } from './task.shema';

export const useCard = () => {
    const { removeTask } = useTaskCleaner();
    const { selectedTask, isLoading, originalTask } = useTaskManager();
    const { saveTask } = useTaskCreator();
    const {
        getFieldProps,
        resetForm,
        setValues,
        values,
        setFieldValue,
        errors,
        dirty,
        isValid
    } = useFormik({
        initialValues: selectedTask,
        enableReinitialize: true,
        validationSchema: taskSchema
    });

    const originalEmptyTask = {
        completed: false,
        title: '',
        description: '',
        tag: '',
        checklist: [],
        deadline: moment().endOf('day').format()
    };

    const empty = selectedTask && selectedTask.hash === undefined;

    const unsaved = empty ?
        !R.equals(originalEmptyTask, values) :
        !R.equals(originalTask, values)
    ;

    const isFormBlocked = isLoading || !unsaved;

    useEffect(() => {
        if (empty) {
            resetForm();
        }
    }, [empty, resetForm]);

    const setTag = (tag) => {
        setFieldValue('tag', tag);
    };

    const removeCurrentTask = () => {
        removeTask(selectedTask.hash);
    };

    const completeTask = () => {
        setValues({
            ...values,
            completed: !values.completed
        });
    };

    const saveFullTask = () => {
        saveTask(values);
    };

    const handleResetForm = () => {
        resetForm();
    };

    const checklistError = dirty
        && errors.checklist
        && (typeof errors.checklist === 'string')
        && errors.checklist;

    const subTasksError = dirty
        && errors.checklist
        && Array.isArray(errors.checklist)
        && errors.checklist
            .map((error, index) => error && `${index + 1} ${error.title}`)
            .filter((error) => Boolean(error));

    return {
        removeCurrentTask,
        isFormBlocked,
        getFieldProps,
        values,
        setTag,
        handleResetForm,
        completeTask,
        empty,
        saveFullTask,
        setFieldValue,
        selectedTask,
        unsaved,
        isValid,
        errors: {
            title: dirty && errors.title,
            tag: dirty && errors.tag,
            checklist: checklistError || subTasksError
        }
    }
}