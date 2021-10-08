// Core
import React from 'react';
import Loader from 'react-loader-spinner';

// Styles
import Styles from './styles.module.css';

export const Spinner = ({isLoading}) => {
    const spinnerJSX = isLoading && (
        <div className={Styles.spinner}>
            <Loader
                type="Triangle"
                color="#00BFFF"
                height={30}
                width={30}
            />
        </div>
    );

    return (
        <>
            {spinnerJSX}
        </>
    );
};
