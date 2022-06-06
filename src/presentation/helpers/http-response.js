const MissingParamError = require('./missing-param-error')
const ResourceConflictError = require('./resource-conflict-error')
const ServerError = require('./server-error')

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new ServerError()
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