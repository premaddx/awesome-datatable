import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  sortTable,
  fetchTableData,
  deleteEmployee,
  changePageSize,
  pagination
} from "../../redux/actions/datatable-action";
import Table from "../Table";
import { COLUMNS } from "./constants";
import "./style.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      pageSize: '',
      sortType: "ASC",
      sortColumn: "id"
    };
  }

  componentDidMount() {
    if(this.props.tableData.length === 0) this.props.fetchTableData();
    this.setState({ pageSize: this.props.pageSize });
  }

  handleSortTable = keyName => () => {
    let sortType;
    if (keyName === this.state.sortColumn) {
      sortType = this.toggleSortType();
      this.props.sortTable(keyName, sortType);
    } else {
      sortType = "ASC";
      this.props.sortTable(keyName, sortType);
    }
    this.setState({ sortType, sortColumn: keyName });
  };

  toggleSortType = () => {
    if (this.state.sortType === "ASC") return "DSC";
    return "ASC";
  };

  deleteEmployee = (obj) => this.props.deleteEmployee(obj.id);

  handlePaginationChange = e => {
    this.props.pagination(e.target.value);
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ pageSize: value });
  }

  handlePageSizeChange = () => {
    // take the value from this.state
    this.props.changePageSize(this.state.pageSize);
  }

  renderPaginationDropdown = () => {
    const currentPage =
      this.props.currentPage && parseInt(this.props.currentPage, 10);
    const totalPages =
      this.props.totalPages && parseInt(this.props.totalPages, 10);
    const numberOfButtons =
        this.props.numberOfButtons && parseInt(this.props.numberOfButtons, 10);
    const limit = currentPage + numberOfButtons <= totalPages ? currentPage + numberOfButtons : totalPages;
    // push the content into the array
    const arr = [currentPage];
    // left side of the centre
    for (let i = 1; i <= Math.floor(numberOfButtons/2); i++) {
      if (arr[0] > 1) arr.unshift(arr[0] - 1);
    }
    // right side of the centre
    while(arr.length < numberOfButtons && arr[arr.length - 1] < limit) arr.push(arr[arr.length - 1] + 1);
    // for edge case - insert element in the front
    while(arr.length < numberOfButtons && arr[0] > 1) arr.unshift(arr[0] - 1);
    return (
      <div>
        {currentPage === 1 ? null : <button
          type="button"
          onClick={this.handlePaginationChange}
          value={currentPage - 1 > 0 ? currentPage - 1 : currentPage}
        >
          Previous
        </button>}
        {arr.map(val => (
          <button
            type="button"
            onClick={this.handlePaginationChange}
            key={val}
            value={val}
          >
            {val}
          </button>
        ))}
        {currentPage === limit ? null : <button
          type="button"
          onClick={this.handlePaginationChange}
          value={currentPage + 1 <= limit ? currentPage + 1 : currentPage}
        >
          Next
        </button>}
      </div>
    );
  };

  openView = (obj = {}) => {
    if (Object.keys(obj).length === 0) return [];
    this.props.history.push(`/users/${obj.id}`, obj);
  };

  getActions = () => {
    return [
      {
        label: "Open",
        cb: this.openView
      },
      {
        label: "Delete",
        cb: this.deleteEmployee
      }
    ];
  };

  render() {
    const { tableData } = this.props;
    return (
      <div className="body-container">
        <div>
          Number of Records: <input type='text' value={this.state.pageSize} onChange={this.handleInputChange}></input>
          <button onClick={this.handlePageSizeChange}>Show</button>
        </div>
        <Table
          actions={this.getActions()}
          data={tableData}
          sortCb={this.handleSortTable}
          cols={COLUMNS}
          fixedHeader={true}
        />
        <div>{this.renderPaginationDropdown()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dataTableReducer: { tableData, totalPages, currentPage, pageSize, numberOfButtons }
  } = state;
  return {
    tableData,
    totalPages,
    currentPage,
    pageSize,
    numberOfButtons,
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    sortTable,
    pagination,
    fetchTableData,
    changePageSize,
    deleteEmployee
  }
)(HomePage));
