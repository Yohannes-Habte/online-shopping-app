import { Link } from "react-router-dom";
import { pageLayout, typography } from "../../styles/uiConfig";
import Button from "../../components/common/Button";
import { ArrowLeft } from "lucide-react";
import DynamicIcon from "../../components/common/DynamicIcon";

const CartPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      {/* If cart is empty, navigate to products page */}

      <section className={`${pageLayout.mainSection}`}>
        <Link to="/products">
          <Button variant="secondary" size="md" rounded="sm" shadow="sm">
            <DynamicIcon
              icon={ArrowLeft}
              className="w-4 h-4"
              ariaLabel="Go to Products Page"
            />{" "}
            Go to Products
          </Button>
        </Link>

        <h1 className={`${typography.title}`}>Cart Page</h1>
      </section>
    </main>
  );
};

export default CartPage;
