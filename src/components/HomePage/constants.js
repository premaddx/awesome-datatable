import React, { Fragment } from "react";

export const COLUMNS = {
  email:{
    label: "Email",
    sortable: true
  },
  displayName:{
    label: "Display Name",
    sortable: true
  },
  username:{
    label: "Username",
    sortable: false
  },
  address:{
    label: "Address",
    sortable: false
  },
  phone:{
    label: "Phone",
    sortable: false
  },
  website:{
    label: "Website",
    sortable: false
  },
  company:{
    label: "Company",
    sortable: false
  },
  actions:{
    label: "",
    sortable: false,
    isAction: true
  }
};

export const MODAL = {
  VIEW: "View",
};


export const View = ({ a }) => {
  return (
    <Fragment>
      <div className="header-section">
        <div className="modal-header">{a.name}</div>
      </div>
      <ul className="view-list">
        <li>
          <div className="label">email</div>
          <div className="value">{a.email}</div>
        </li>
        <li>
          <div className="label">User Name</div>
          <div className="value">{a.username}</div>
        </li>
        <li>
          <div className="label">Address</div>
          <div className="value">{a.address && `${a.address.suite} ${a.address.street} ${a.address.city} ${a.address.zipcode}`}</div>
        </li>
        <li>
          <div className="label">Phone Number</div>
          <div className="value">{a.phone}</div>
        </li>
        <li>
          <div className="label">Website</div>
          <div className="value">{a.website}</div>
        </li>
        <li>
          <div className="label">Company</div>
          <div className="value">{a.company && a.company.name}</div>
        </li>
      </ul>
    </Fragment>
  );
};
