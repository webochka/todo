// Core
import React from 'react';
import cx from 'classnames';

// Other
import { availableTags } from '../../bus/taskManager/availableTags';

export const Tag = ({type, selected, cb}) => {
    let specialType;

    switch (type) {
        case availableTags[0]: {
            specialType = 'first';
            break;
        }
        case availableTags[1]: {
            specialType = 'second';
            break;
        }
        case availableTags[2]: {
            specialType = 'third';
            break;
        }
        case availableTags[3]: {
            specialType = 'fourth';
            break;
        }
        case availableTags[4]: {
            specialType = 'fifth';
            break;
        }
        default: {
            throw new Error('Wrong type');
        }
    }

    const tagCX = cx('tag', specialType, {selected: selected});

    const clickHandler = () => {
        if (typeof cb === 'function') {
            cb(type);
        }
    };

    return (
        <span className={tagCX} onClick={clickHandler}>{type}</span>
    );
};
