// Core
import React from 'react';
import { Provider } from 'react-redux';

// Components
import { TaskManager } from './bus/taskManager';

// Other
import { store } from './init/store';

// Libraries
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  )
};
