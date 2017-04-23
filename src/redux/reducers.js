import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import adminReducer from './reducer';
import localeReducer from './reducer/locale';

export default function configureReducers({ resources, locale, customReducers }) {
    return combineReducers({
        admin: adminReducer(resources),
        locale: localeReducer(locale),
        form: formReducer,
        routing: routerReducer,
        ...customReducers,
    });
}