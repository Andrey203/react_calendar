import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import eventReducer from './reducers/eventReducer';

const store = createStore(eventReducer);

ReactDOM.render(
    <Provider store={store}>
            <div>
                <App />
            </div>
    </Provider> ,
    document.getElementById('root'));