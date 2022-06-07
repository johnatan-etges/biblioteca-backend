const HttpResponse = require('../helpers/http-response')

module.exports = class AddBookRouter {
  constructor(createBookUseCase) {
    this.createBookUseCase = createBookUseCase
  }

  async route(httpRequest) {
    try {
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
      
      const created = await this.createBookUseCase.execute(title, publisher, photo, authors)
      
      if (!created) {
        return HttpResponse.resourceConflictError('book', title)
      }

      return HttpResponse.ok()
    
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}