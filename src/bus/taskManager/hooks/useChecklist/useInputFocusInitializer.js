// Core
import { useEffect } from 'react';

export const useInputFocusInitializer = (dynamicFields) => {
    useEffect(() => {
        const lastSubTask = dynamicFields[dynamicFields.length - 1];
        lastSubTask && lastSubTask.ref && lastSubTask.ref.current.focus();
    }, [dynamicFields]);
};
