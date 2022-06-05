class AddBookRouter {
  route(httpRequest) {
    const { title, publisher, photo, authors } = httpRequest.body;
    if (!title || !publisher || !photo || !authors) {
      return {
        statusCode: 400
      }
    }
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
  })
 })