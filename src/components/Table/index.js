import React from "react";
import "./style.css";
export default class Table extends React.Component {
  callAction = (cb, obj) => () => {
    cb(obj);
  };

  render() {
    const { actions, sortCb, data, cols, fixedHeader } = this.props;
    return (
      <div className={`table-container ${fixedHeader ? "fixed-header" : ""}`}>
        <table className="container">
          <thead>
            <tr>
              {Object.keys(cols).map(col => {
                return (
                  <th scope="col" key={col}>
                    {cols[col].sortable ? (
                      <a onClick={sortCb(col)} className="sort-by">
                        {cols[col].label}
                      </a>
                    ) : (
                      <span>{cols[col].label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(obj => {
              return (
                <tr key={obj.id}>
                  <td>{obj.email}</td>
                  <td>{obj.username}</td>
                  <td>{obj.name}</td>
                  <td>{obj.address && `${obj.address.suite} ${obj.address.street} ${obj.address.city} ${obj.address.zipcode}`}</td>
                  <td>{obj.phone}</td>
                  <td>{obj.website}</td>
                  <td>{obj.company && obj.company.name}</td>
                  {actions ? (
                    <td>
                      <div className="actions">
                        {actions.map(k => (
                          <button
                            type="button"
                            onClick={this.callAction(k.cb, obj)}
                            key={k.label}
                          >
                            {k.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
