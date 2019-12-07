import {
  DELETE,
  SORT,
  PAGINATION,
} from "../action-constants";


const filterRecords = (state) => {
  const lastIndex = state.currentPage * state.pageSize;
  const startIndex = lastIndex - state.pageSize;
  const tableData = state.data.slice(startIndex, lastIndex);
  return {
    ...state,
    totalPages: Math.ceil(state.data.length / state.pageSize),
    tableData,
  };
};


const INITIAL_STATE = {
    data: [],
    tableData: [],
    currentPage: 1, // index of current page
    totalPages: 1, // count of total number of pages
    numberOfButtons: 5, // maximum number of pagination buttons to be shown
    pageSize: 5, // number of rows in the table at a time
};

// after each operation set the totalPages

export default function dataTableReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE: {
      const index = state.data.findIndex(obj => obj.id === action.data.id);
      state.data.splice(index, 1);
      return filterRecords(state);
    }
    case SORT: {
      const tableData = [...action.data];
      return { ...state, tableData };
    }
    case PAGINATION: {
      state.currentPage = action.data.pageNo;
      return filterRecords(state);
    }
    default:
      if (action.data) {
        state.data = action.data;
      }
      return filterRecords(state);
  }
}
