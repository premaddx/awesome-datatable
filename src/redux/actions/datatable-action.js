import {
    DELETE,
    SORT,
    PAGINATION,
    DEFAULT,
} from '../action-constants';

import { GET_USERS_URL } from '../../constants';

function defaultAction(data) {
    return {
        type: DEFAULT,
        data
    }
}

function sortAction (data) {
    return {
        type: SORT,
        data
    }
}


function deleteAction (data) {
    return {
        type: DELETE,
        data
    }
}


function paginationAction (data) {
    return {
        type: PAGINATION,
        data
    }
}

export function fetchTableData () {
    return async dispatch => {
        fetch(GET_USERS_URL)
        .then(results => results.json())
        .then(data => dispatch(defaultAction(data)));
    }
}

export function pagination (pageNo) {
    return dispatch => {
        dispatch(paginationAction({ pageNo }));
    }
}

export function sortTable (data, key, order = 'ASC') {
    return dispatch => {
        // sort the data as per key and dispatch action
        const sortedArray = data.sort((a, b) => {
            const val = typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key];
            if (order === 'ASC') return val;
            else return -val;
        });
        dispatch(sortAction(sortedArray));
    }
}

export function deleteEmployee (id) {
    return dispatch => {
        dispatch(deleteAction({ id }));
    }
}
