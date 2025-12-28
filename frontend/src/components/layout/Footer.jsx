import { Link } from "react-router-dom";
import { footer } from "../../styles/uiConfig";
import { useEffect } from "react";
import { useState } from "react";
import { fetchFooter } from "../../api/footerApi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Footer Data:", footerData);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const result = await fetchFooter();
        if (result.success) {
          setFooterData(result.data);
        } else {
          setError("Failed to load footer.");
        }
      } catch (err) {
        console.error("Error fetching footer:", err);
        setError("Something went wrong while fetching footer.");
      } finally {
        setLoading(false);
      }
    };

    loadFooter();
  }, []);

  if (loading) return <p>Loading footer...</p>;
  if (error) return <p>{error}</p>;

  return (
    <footer className={`${footer.container}`} aria-label="Footer Section">
      <div className={`${footer.sectionsContainer}`}>
        {footerData.map((section) => (
          <section key={section.title} className={`${footer.section}`}>
            <h3 className={`${footer.heading}`}>{section.title}</h3>
            {section.links.map((link) => (
              <Link to={link.to} key={link.label} className={`${footer.link}`}>
                {link.label}
              </Link>
            ))}
          </section>
        ))}
      </div>

      <hr className="my-6 border-t border-gray-700 dark:border-gray-600" />

      <p className={`${footer.copyRight}`}>
        © {currentYear} LisaConsult. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
