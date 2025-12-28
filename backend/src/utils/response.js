export const sendSuccess = (res, data = {}, message = "Success") => {
  return res.status(200).json({ success: true, message, data });
};

export const sendError = (res, message = "Error", status = 500) => {
  return res.status(status).json({ success: false, message });
};
