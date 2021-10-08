// Core
import moment from 'moment';

export const transformTaskFromUtcFormat = ({deadline, ...otherProperties}) => (
    {
        ...otherProperties,
        deadline: moment(deadline).format()
    }
);
