class AddBookRouter {
  route(httpRequest) {
    if (!httpRequest.title) {
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
 })