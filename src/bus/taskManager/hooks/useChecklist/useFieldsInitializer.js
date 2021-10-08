// Core
import { useEffect } from 'react';

export const useFieldsInitializer = (props) => {
    const {
        subTasks,
        setValues,
        setMemoizedDynamicFields
    } = props;

    useEffect(() => {
        if(subTasks) {
            const updatesSubTasks = subTasks.map((subTask) => {
                return subTask.title
            });

            const completedTasks = subTasks && subTasks
                .filter((subTask) => {
                    return subTask.completed;
                })
                .map((subTask) => {
                    return subTask.hash;
                });

            setValues({
                subTasks: updatesSubTasks,
                completedTasks: completedTasks,
                completedDynamicTasks: []
            });
        }

        setMemoizedDynamicFields([]);
    }, [subTasks, setValues, setMemoizedDynamicFields]);
};
