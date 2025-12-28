import React from "react";
import { NavLink } from "react-router-dom";
import { headerNavLinkStatus } from "../../styles/uiConfig";

const Navbar = () => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "Kids", path: "/kids" },
    { name: "FAQs", path: "/faqs" },
  ];

  const menuLinkStatus = ({ isActive }) => {
    return isActive
      ? `${headerNavLinkStatus.active}`
      : `${headerNavLinkStatus.inActive}`;
  };

  return (
    <nav aria-label="Primary Navigation">
      <ul className="flex items-center gap-4 lg:gap-6">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} className={menuLinkStatus}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
