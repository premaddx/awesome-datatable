import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  sortTable,
  fetchTableData,
  deleteEmployee,
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
      sortType: "ASC",
      sortColumn: "id"
    };
  }

  componentDidMount() {
    if(this.props.tableData.length === 0) this.props.fetchTableData();
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

  renderPaginationDropdown = () => {
    const arr = [];
    const currentPage =
      this.props.currentPage && parseInt(this.props.currentPage, 10);
    const totalPages =
      this.props.totalPages && parseInt(this.props.totalPages, 10);
    const numberOfButtons =
        this.props.numberOfButtons && parseInt(this.props.numberOfButtons, 10);
    const limit = currentPage + numberOfButtons <= totalPages ? currentPage + numberOfButtons : totalPages;
    for (let i = currentPage; i <= limit; i++) arr.push(i);
    return (
      <div>
        <button
          type="button"
          onClick={this.handlePaginationChange}
          value={currentPage - 1 > 0 ? currentPage - 1 : currentPage}
        >
          Previous
        </button>
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
        <button
          type="button"
          onClick={this.handlePaginationChange}
          value={currentPage + 1 <= limit ? currentPage + 1 : currentPage}
        >
          Next
        </button>
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
    deleteEmployee
  }
)(HomePage));
