import { footerSections } from "../../constants/footer.js";

export const getFooterSections = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: footerSections,
      message: "Footer sections fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error: " + error.message });
  }
};
