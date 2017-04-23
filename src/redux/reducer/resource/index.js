import { combineReducers } from 'redux';
import data from './data';
import list from './list/index';

export default (resource) => combineReducers({
    data: data(resource),
    list: list(resource),
});
