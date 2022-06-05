class AddBookRouter {
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
  }
}

class HttpResponse {
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
}

class MissingParamError extends Error {
  constructor(param) {
    super(`Missing param: ${param}`)
    this.name = 'MissingParamError'
  }
}

describe('AddBookRouter', () => { 
  it('Should return 400 if no title is provided', () => {
    const sut = new AddBookRouter()
    const httpRequest = {
      body: {
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })

  it('Should return 400 if no publisher is provided', () => {
    const sut = new AddBookRouter()
    const httpRequest = {
      body: {
        title: 'any title',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('publisher'))
  })

  it('Should return 400 if no photo is provided', () => {
    const sut = new AddBookRouter()
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        authors: ['any author']
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('photo'))
  })

  it('Should return 400 if no title is provided', () => {
    const sut = new AddBookRouter()
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        photo: 'any photo',
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('authors'))
  })

  it('Should return 500 if no httpRequest is provided', () => {
    const sut = new AddBookRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  it('Should return 500 if httpRequest has no body', () => {
    const sut = new AddBookRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})