import { Outlet, Link } from "react-router-dom";

import "./Layout.css";
import { useState } from "react";

const Layout = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
    console.log(click)

  }


  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li>
            <Link to="/equipment">
              <button type="button" onClick={handleClick}>
                Equipment
              </button>
            </Link>
          </li>
          {click ? (
            <li>
              <Link to="/create">
                <button type="button">Create Employee</button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/createEquipment">
                <button type="button">Create Equiptment</button>
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
