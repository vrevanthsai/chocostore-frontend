import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const UserMenu = () => {
  const [auth] = useAuth();
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>DashBoard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/change-password"
            className="list-group-item list-group-item-action"
          >
            Change Password
          </NavLink>
          {auth?.user?.role === 1 && (
            <NavLink
              to="/dashboard/admin"
              className="list-group-item list-group-item-action"
            >
              Admin Panel/Operations
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMenu;
