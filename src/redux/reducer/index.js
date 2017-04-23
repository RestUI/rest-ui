import { combineReducers } from 'redux';
import resourceReducer from './resource/index';
import loading from './loading';
import notification from './notification';
import references from './references/index';
import saving from './saving';
import ui from './ui';

export default (resources) => {
    const resourceReducers = {};

    resources.forEach(({ name, options }) => resourceReducers[name] = resourceReducer(name, options));

    return combineReducers({
        ...resourceReducers,
        loading,
        notification,
        references,
        saving,
        ui,
    });
};
