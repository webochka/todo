// Core
import {
    useCallback,
    useState
} from 'react';

export const useDynamicFieldsManager = () => {
    const [dynamicFields, setDynamicFields] = useState([]);

    const setMemoizedDynamicFields = useCallback((fields) => {
        setDynamicFields(fields);
    }, []);

    return {
        dynamicFields,
        setMemoizedDynamicFields,
        setDynamicFields
    }
};
