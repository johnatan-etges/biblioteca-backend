const HttpResponse = require('../helpers/http-response')

module.exports = class AddBookRouter {
  constructor(createBookUseCase) {
    this.createBookUseCase = createBookUseCase
  }

  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { title, publisher, photo, authors } = httpRequest.body;
    if (!title) {
      return HttpResponse.badRequest('title')
    }

    if (!publisher) {
      return HttpResponse.badRequest('publisher')
    }

    if (!photo) {
      return HttpResponse.badRequest('photo')
    }

    if (!authors) {
      return HttpResponse.badRequest('authors')
    }

    this.createBookUseCase.execute(title, publisher, photo, authors)
    
    return {
      statusCode: 409
    }
  }

}