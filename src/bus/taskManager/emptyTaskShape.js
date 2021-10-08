// Core
import moment from 'moment';

export const emptyTaskShape = {
    completed: false,
    title: '',
    description: '',
    tag: '',
    checklist: [],
    deadline: moment().endOf('day').format()
};
