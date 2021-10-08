// Core
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export const CustomDatePicker = (props) => {
    const {
        label,
        setFieldValue,
        ...otherProps
    } = props;

    const handleChange = (value) => {
        setFieldValue(
            'deadline',
            moment(value)
                .endOf('day')
                .format()
        );
    };

    const today = moment()
        .endOf('day')
        .toDate();

    const selectedDay = moment(otherProps.value)
        .endOf('day')
        .toDate();

    const value = otherProps.value ? selectedDay : today;

    return (
        <div className="deadline">
            <span className="label">Due to</span>
            <span className="date">
                <DatePicker
                    onChange={handleChange}
                    minDate={today}
                    value={value}
                    selected={value || null}
                    dateFormat="MMMM d, yyyy"
                />
            </span>
        </div>
    );
};
