const { validationResult } = require("express-validator")

exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))
    
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()

    const extractedErrors = {}
    errors.array().forEach((error) => {
      const { param, msg } = error
      if (!param) return

      if (!extractedErrors[param]) extractedErrors[param] = msg
    })
    req.errors = extractedErrors
    return next()
  }
}