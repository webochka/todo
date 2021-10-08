// Core
import { useEffect } from 'react';

export const useDynamicFieldsInitializer = (props) => {
    const {
        values,
        selectedTask,
        dynamicFields,
        setFieldValue
    } = props;

    useEffect(() => {
        if (values && selectedTask && selectedTask.checklist) {
            const updatedSubTasks = selectedTask.checklist.map((currentSubTask, index) => {
                const isCompleted = values.completedTasks.includes(currentSubTask.hash);

                return {
                    title: values.subTasks[index],
                    hash: currentSubTask.hash,
                    completed: isCompleted
                }
            });
            const dynamicSubTasksStartIndex = values.subTasks.length - dynamicFields.length;
            const updatedDynamicSubTasks = dynamicFields.map((currentDynamicSubTask, index) => {
                const isCompleted = values.completedDynamicTasks.includes(index);

                return {
                    title: values.subTasks[dynamicSubTasksStartIndex + index],
                    completed: isCompleted
                }
            });

            setFieldValue('checklist', [...updatedSubTasks, ...updatedDynamicSubTasks]);
        }
    }, [values, dynamicFields, selectedTask, setFieldValue]);
}