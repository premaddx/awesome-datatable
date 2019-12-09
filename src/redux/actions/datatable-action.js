import {
    DELETE,
    SORT,
    PAGINATION,
    CHANGE_PAGE_SIZE,
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

function changePageSizeAction(data) {
    return {
        type: CHANGE_PAGE_SIZE,
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

export function changePageSize (pageSize) {
    return dispatch => {
        dispatch(changePageSizeAction({ pageSize }));
    }
}

export function sortTable (key, order = 'ASC') {
    return dispatch => {
        dispatch(sortAction({ order, key }));
    }
}

export function deleteEmployee (id) {
    return dispatch => {
        dispatch(deleteAction({ id }));
    }
}
