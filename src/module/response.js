module.exports = {
  success: (res, { message, data }, status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, { message, data }, status = 500) => {
    return res.status(status).json({
      success: false,
      message,
      data,
    });
  },
};
