exports.success = (res, data, message = 'Succès', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

exports.error = (res, message = 'Erreur', statusCode = 500, errors = null) =>
  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });