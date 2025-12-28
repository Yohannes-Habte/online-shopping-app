import Navbar from "./Navbar";
import DynamicIcon from "../common/DynamicIcon";
import { ShoppingCart, Power } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { boxContainer, header, typography } from "../../styles/uiConfig";

const Header = () => {
  return (
    <header className={`${header.container}`} aria-label="Main Header">
      {/* Logo of the Business */}
      <Link to="/">
        {" "}
        <h1 className={`${typography.subtitle}`}>LisaConsult</h1>{" "}
      </Link>

      {/* Navigation Links */}
      <Navbar />

      {/* User Actions */}
      <div className={`${boxContainer.center}`}>
        <Link to="/cart">
          <DynamicIcon
            icon={ShoppingCart}
            size={14}
            count={0}
            ariaLabel="Shopping Cart"
            relative={true}
          />
        </Link>
        <Link to="/login">
          <Button>Log In</Button>
        </Link>

        <Link to="/" aria-label="Log Out">
          <DynamicIcon icon={Power} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
