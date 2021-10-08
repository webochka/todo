// Core
import React from 'react';

// Components
import { List } from './components/list';
import { Card } from './components/card';

// Elements
import { Spinner } from '../../elements/spinner';

// Styles
import './styles/index.scss';

// Hooks
import {useTaskManager} from './hooks/useTaskManager';

export const TaskManager = () => {
    const { isLoading, createEmptyCard } = useTaskManager();

    return (
        <>
            <main>
                <div className="controls">
                    <button className="button-create-task" onClick={createEmptyCard}>New Task</button>
                </div>
                <div className="wrap">
                    <List/>
                    <Card/>
                </div>
            </main>
            <Spinner isLoading={isLoading} />
        </>
    )
}