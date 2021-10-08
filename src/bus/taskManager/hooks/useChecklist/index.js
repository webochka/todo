// Core
import { useFormik } from 'formik';
import { createRef } from 'react';

// Hooks
import { useTaskManager } from '../useTaskManager';
import { useChecklistResetter } from './useChecklistResetter';
import { useDynamicFieldsInitializer } from './useDynamicFieldsInitializer';
import { useFieldsInitializer } from './useFieldsInitializer';
import { useInputFocusInitializer } from './useInputFocusInitializer';
import { useDynamicFieldsManager } from './useDynamicFieldsManager';

export const useChecklist = (props) => {
    const {
        setFieldValue,
        isParentFormChanged
    } = props;

    const { selectedTask } = useTaskManager();

    const subTasks = selectedTask && selectedTask.checklist;
    const initialSubTasks = subTasks && subTasks.map((subTask) => subTask.title);
    const initialCompletedTasks = selectedTask && selectedTask.checklist && selectedTask.checklist
        .filter((subTask) => subTask.completed === true)
        .map((subTask) => subTask.hash);

    const {
        values,
        getFieldProps,
        setValues,
        resetForm
    } = useFormik({
        initialValues: {
            subTasks: initialSubTasks || [],
            completedTasks: initialCompletedTasks || [],
            completedDynamicTasks: [],
            refs: []
        },
        enableReinitialize: true
    });

    const {
        dynamicFields,
        setMemoizedDynamicFields,
        setDynamicFields
    } = useDynamicFieldsManager();

    useChecklistResetter({
        isParentFormChanged,
        resetForm,
        setDynamicFields
    });

    useDynamicFieldsInitializer({
        values,
        selectedTask,
        dynamicFields,
        setFieldValue
    });

    useFieldsInitializer({
        subTasks,
        setValues,
        setMemoizedDynamicFields
    });

    useInputFocusInitializer(dynamicFields);

    const completeTask = (hash) => {
        const originalCompletedTasks = values.completedTasks;

        if(originalCompletedTasks.includes(hash)) {
            const filtered = originalCompletedTasks.filter((currentSubTask) => {
                return currentSubTask !== hash;
            });

            setValues({
                ...values,
                completedTasks: filtered
            })
        } else {
            setValues({
                ...values,
                completedTasks: [...new Set([...values.completedTasks, hash])]
            });
        }
    }

    const completeDynamicTask = (index) => {
        const originalCompletedTasks = values.completedDynamicTasks;

        if (originalCompletedTasks.includes(index)) {
            const filtered = originalCompletedTasks.filter((currentSubTask) => {
                return currentSubTask !== index;
            });

            setValues({
                ...values,
                completedTasks: values.completedTasks,
                completedDynamicTasks: filtered
            })
        } else {
            setValues({
                ...values,
                completedTasks: values.completedTasks,
                completedDynamicTasks: [...new Set([...values.completedDynamicTasks, index])]
            });
        }
    }

    const addMore = (e) => {
        const updatedSubTasks = [...values.subTasks];
        const ref = createRef();

        const latestIndex = values.subTasks.length;
        updatedSubTasks[latestIndex] = e.target.value;

        setValues({
            completedTasks: values.completedTasks,
            completedDynamicTasks: values.completedDynamicTasks,
            subTasks: updatedSubTasks
        });

        const futureSubTasks = [...dynamicFields, {
            title: e.target.value,
            ref: ref
        }];

        setMemoizedDynamicFields(futureSubTasks);

        e.target.value = '';
    };

    return {
        dynamicFields,
        addMore,
        getFieldProps,
        completeTask,
        completeDynamicTask,
        subTasks
    }
}