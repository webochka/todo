// Core
import React from 'react';

export const CustomTextarea = (props) => {
    const {
        cx,
        label,
        placeholder,
        value,
        ...otherProps
    } = props;

    const textareaValue = value || '';

    return (
        <div className={cx}>
            <span className="label">
                {label}
            </span>
            <textarea
                placeholder={placeholder}
                className="text"
                value={textareaValue}
                {...otherProps}
            />
        </div>
    );
};
