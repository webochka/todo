// Core
import * as Yup from 'yup';

// Other
import { availableTags } from '../../availableTags';

export const taskSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Task title is too short')
        .required('Task title field is required'),
    tag: Yup.mixed()
        .oneOf(availableTags, 'Tag type is invalid')
        .required('Task tag field is required'),
    checklist: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string()
                    .min(3, 'Sub-task title is too short')
                    .required('Sub-task title field is required'),
            })
        )
        .required(`Task doesn't contain any sub-tasks`)
});
