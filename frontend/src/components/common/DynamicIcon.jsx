
import { header, boxContainer } from "../../styles/uiConfig";

const DynamicIcon = ({
  icon: Icon,
  count = 0,
  ariaLabel = "Icon",
  className = "",
  relative = false,
}) => {
  if (!Icon) return null;

  return (
    <div className={`${boxContainer.base} ${relative ? "relative" : ""}`}>
      <Icon
        aria-label={ariaLabel}
        className={`${header.reactIcon} ${className}`}
      />
      {count > 0 && <span className={header.badgeBase}>{count}</span>}
    </div>
  );
};

export default DynamicIcon;

