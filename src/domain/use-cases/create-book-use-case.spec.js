const CreateBookUseCase = require('./create-book-use-case')
const { MissingParamError } = require("../../shared/errors")

const params = {
  title: 'any title',
  publisher: 'any publisher',
  photo: 'any photo',
  authors: ['any author']
}

const makeSut = () => {
  const findBookByTitleRepositorySpy = makeFindBookByTitleRepositorySpy()
  findBookByTitleRepositorySpy.bookId = 'any book id' 
  const addBookRepositorySpy = makeAddBookRepository()
  const sut = new CreateBookUseCase({
    findBookByTitleRepository: findBookByTitleRepositorySpy, 
    addBookRepository: addBookRepositorySpy
  })
  return {
    sut,
    findBookByTitleRepositorySpy,
    addBookRepositorySpy
  }
}

const makeFindBookByTitleRepositorySpy = () => {
  class FindBookByTitleRepositorySpy {
    find(title) {
      this.title = title
      return this.bookId
    }
  }

  return new FindBookByTitleRepositorySpy()
}

const makeFindBookByTitleRepositorySpyWithError = () => {
  class FindBookByTitleRepositorySpyWithError{
    find(title) {
      throw new Error()
    }
  }

  return new FindBookByTitleRepositorySpyWithError()
}

const makeAddBookRepository = () => {
  class AddBookRepository {
    add (title, publisher, photo, authors) {
      this.title = title
      this.publisher = publisher
      this.photo = photo
      this.authors = authors
    }
  }

  return new AddBookRepository()
}

const makeAddBookRepositorySpyWithError = () => {
  class AddBookRepository {
    add (title, publisher, photo, authors) {
      throw new Error()
    }
  }

  return new AddBookRepository()
}

describe('CreateBookUseCase', () => { 

  it('Should throw if no title is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute({})
    await expect(promise).rejects.toThrow(new MissingParamError('title'))
  })

  it('Should throw if no publisher is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute({...params, publisher: null})
    await expect(promise).rejects.toThrow(new MissingParamError('publisher'))
  })

  it('Should throw if no photo is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute({...params, photo: null})
    await expect(promise).rejects.toThrow(new MissingParamError('photo'))
  })

  it('Should throw if no author is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute({...params, authors: null})
    await expect(promise).rejects.toThrow(new MissingParamError('authors'))
  })

  it('Should call FindBookByTitleRepository with correct title', async () => {
    const { sut, findBookByTitleRepositorySpy } = makeSut();
    await sut.execute(params)
    expect(findBookByTitleRepositorySpy.title).toBe(params.title)
  })

  it('Should return false if the title already exists', async () => {
    const { sut } = makeSut();
    const created = await sut.execute({...params, title: 'already existent title'})
    expect(created).toBe(false)
  })

  it('Should call AddBookRepository with correct params', async () => {
    const { sut, findBookByTitleRepositorySpy, addBookRepositorySpy } = makeSut()
    findBookByTitleRepositorySpy.bookId = null
    await sut.execute(params)
    expect(addBookRepositorySpy.title).toBe(params.title)
    expect(addBookRepositorySpy.publisher).toBe(params.publisher)
    expect(addBookRepositorySpy.photo).toBe(params.photo)
    expect(addBookRepositorySpy.authors).toEqual(params.authors)
  })

  it('Should return true if a book is created', async () => {
    const { sut, findBookByTitleRepositorySpy } = makeSut()
    findBookByTitleRepositorySpy.bookId = null
    const created = await sut.execute(params)
    expect(created).toBe(true)
  })

  it('Should throw if invalid dependencies are provided', async () => {
    const invalid = {}
    const findBookByTitleRepositorySpy = makeFindBookByTitleRepositorySpy()
    const addBookRepositorySpy = makeAddBookRepository()
    const suts = [].concat(
      new CreateBookUseCase(),
      new CreateBookUseCase({}),
      new CreateBookUseCase({
        addBookRepository: invalid
      }),
      new CreateBookUseCase({
        addBookRepository: addBookRepositorySpy,
      }),
      new CreateBookUseCase({
        addBookRepository: addBookRepositorySpy,
        findBookByTitleRepository: invalid
      })
    )

    for (const sut of suts) {
      const promise = sut.execute(params)
      await expect(promise).rejects.toThrow()
    }
  })

  it('Should throw if any dependency throws', async () => {
    const findBookByTitleRepositorySpy = makeFindBookByTitleRepositorySpy()
    const addBookRepositorySpy = makeAddBookRepository()
    const suts = [].concat(
      new CreateBookUseCase({
        addBookRepository: makeAddBookRepositorySpyWithError(),
        findBookByTitleRepository: findBookByTitleRepositorySpy
      }),
      new CreateBookUseCase({
        addBookRepository: addBookRepositorySpy,
        findBookByTitleRepository: makeFindBookByTitleRepositorySpyWithError()
      })
    )
    
    for (const sut of suts) {
      const promise = sut.execute(params)
      await expect(promise).rejects.toThrow()
    }
  })
  
})