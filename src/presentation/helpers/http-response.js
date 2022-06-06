const MissingParamError = require('./missing-param-error')
const ResourceConflictError = require('./resource-conflict-error')

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError() {
    return {
      statusCode: 500
    }
  }

  static resourceConflictError(resourceType, resourceName) {
    return {
      statusCode: 409,
      body: new ResourceConflictError(resourceType, resourceName)
    }
  }

  static ok() {
    return {
      statusCode: 200
    }
  }
}