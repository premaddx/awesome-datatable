import React from 'react';
import { withRouter } from "react-router";
import "./style.css";

function UserInfo (props) {
    const obj = props.history.location.state;
    const handleClick = () => props.history.push('/');

    return (
        <div>
            <div className="header-section">
                <div className="view-header">{obj.name}</div>
            </div>
            <ul className="view-list">
                <li>
                    <div className="label">Email</div>
                    <div className="value">{obj.email}</div>
                </li>
                <li>
                    <div className="label">User Name</div>
                    <div className="value">{obj.username}</div>
                </li>
                <li>
                    <div className="label">Address</div>
                    <div className="value">{obj.address && `${obj.address.suite} ${obj.address.street} ${obj.address.city} ${obj.address.zipcode}`}</div>
                </li>
                <li>
                    <div className="label">Phone Number</div>
                    <div className="value">{obj.phone}</div>
                </li>
                <li>
                    <div className="label">Website</div>
                    <div className="value">{obj.website}</div>
                </li>
                <li>
                    <div className="label">Company</div>
                    <div className="value">{obj.company && obj.company.name}</div>
                </li>
            </ul>
            <button onClick={handleClick}>Back</button>
        </div>
    );
}

export default withRouter(UserInfo);
