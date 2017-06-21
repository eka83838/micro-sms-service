var Joi = require('joi')

module.exports = {
  insert: {
    payload: Joi.object({
      content: Joi.string().min(2).max(255).required(),
      sender: Joi.string().required(),
      recipient: Joi.string().required()
    })
  }
}
