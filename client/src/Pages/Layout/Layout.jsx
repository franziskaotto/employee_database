import { Outlet, Link } from "react-router-dom";

import "./Layout.css";
import { useState } from "react";

const Layout = () => {
  const [click, setClick] = useState("employee")

  const handleClick = () => {
    setClick("equipment")
    console.log(click)

  }


  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/" onClick={() => setClick("employee")}>Employees</Link>

          </li>
          <li>
            <Link to="/company/create">
              <button type="button">
                Create Company
              </button>
            </Link>
          </li>
          <li>
            <Link to="/equipment">
              <button type="button" onClick={handleClick}>
                Equipment
              </button>
            </Link>
          </li>
          {click === "employee" ? (
            <li>
              <Link to="/create">
                <button type="button">Create Employee</button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/createEquipment">
                <button type="button">Create Equipment</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
  
};

export default Layout;
