class AddBookRouter {
  route(httpRequest) {
    if (!httpRequest.body.title || !httpRequest.body.publisher || !httpRequest.body.photo) {
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
 })