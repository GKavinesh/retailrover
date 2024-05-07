import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from '@mui/icons-material/Paid';
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span >MavenTek</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/billing" style={{ textDecoration: "none" }}>
            <li>
              <PaidIcon className="icon" />
              <span>Billing</span>
            </li>
          </Link>


          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Inventory</span>
            </li>
          </Link>


          <Link to="/supplier" style={{ textDecoration: "none" }}>
          <li>
            <GroupIcon className="icon" />
            <span>Suppliers</span>
          </li>

          </Link>
          <Link to = "/customer" style={{ textDecoration: "none" }}>
          <li>
            <PersonIcon className="icon" />
            <span>Customers</span>
          </li>

          </Link>
          <Link to = "/employee" style={{ textDecoration: "none" }}>
          <li>
            <BadgeIcon className="icon" />
            <span>Employees</span>
          </li>
          </Link>

          <p className="title">RESOURCES</p>
          <Link to = "/employee" style={{ textDecoration: "none" }}>
          <li>
            <BadgeIcon className="icon" />
            <span>Calendar</span>
          </li>

          </Link>
          <p className="title">USER</p>
          <Link style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
