const AddBookRouter = require('./add-book-router')
const MissingParamError = require('../helpers/missing-param-error')
const ResourceConflictError = require('../helpers/resource-conflict-error')
const ServerError = require('../helpers/server-error')

const makeSut = () => {
  const createBookUseCaseSpy = makeCreateBookUseCaseSpy()
  const sut = new AddBookRouter(createBookUseCaseSpy)

  return {
    sut,
    createBookUseCaseSpy
  }
}

const makeCreateBookUseCaseSpyWithError = () => {
  class CreateBookUseCaseSpy {
    execute() {
      throw new Error()
    }
  }

  return new CreateBookUseCaseSpy()
}

const makeCreateBookUseCaseSpy = () => {
  class CreateBookUseCaseSpy {
    async execute(title, publisher, photo, authors) {
      this.title = title
      this.publisher = publisher
      this.photo = photo
      this.authors = authors
      
      return this.created
    }
  }

  const createBookUseCaseSpy = new CreateBookUseCaseSpy()
  createBookUseCaseSpy.created = true
  
  return createBookUseCaseSpy
}

describe('AddBookRouter', () => { 
  it('Should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })

  it('Should return 400 if no publisher is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any title',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('publisher'))
  })

  it('Should return 400 if no photo is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('photo'))
  })

  it('Should return 400 if no author is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        photo: 'any photo',
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('authors'))
  })

  it('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should call CreateBookUseCase with correct params', async () => {
    const { sut, createBookUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    sut.route(httpRequest)
    expect(createBookUseCaseSpy.title).toBe(httpRequest.body.title)
    expect(createBookUseCaseSpy.publisher).toBe(httpRequest.body.publisher)
    expect(createBookUseCaseSpy.photo).toBe(httpRequest.body.photo)
    expect(createBookUseCaseSpy.authors).toBe(httpRequest.body.authors)
  })

  it('Should return 409 if book already exists', async () => {
    const { sut, createBookUseCaseSpy } = makeSut()
    createBookUseCaseSpy.created = false
    const httpRequest = {
      body: {
        title: 'already existent title',
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(409)
    expect(httpResponse.body).toEqual(new ResourceConflictError('book', httpRequest.body.title))
  })  

  it('Should return 200 if a book is created', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'valid title',
        publisher: 'valid publisher',
        photo: 'valis photo',
        authors: ['valis author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  it('Should return 500 if no CreateBookUseCase is provided', async () => {
    const sut  = new AddBookRouter()
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return 500 if CreateBookUseCase has no execute method', async () => {
    class CreateBookUseCaseSpy {}
    const createBookUseCaseSpy = {}
    const sut  = new AddBookRouter(createBookUseCaseSpy)
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return 500 if createBookUseCase throws', async () => {
    const createBookUseCaseSpyWithError = makeCreateBookUseCaseSpyWithError()
    const sut = new AddBookRouter(createBookUseCaseSpyWithError)
    const httpRequest = {
      body: {
        title: 'any title',
        publisher: 'any publisher',
        photo: 'any photo',
        authors: ['any author']
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})