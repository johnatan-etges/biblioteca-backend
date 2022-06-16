const CreateBookUseCase = require('./create-book-use-case')
const { MissingParamError, InvalidParamError, DepError } = require("../../shared/errors")

const makeSut = () => {
  const findBookByTitleRepositorySpy = makeFindBookByTitleRepository()
  findBookByTitleRepositorySpy.bookId = 'any book id' 
  const addBookRepositorySpy = makeAddBookRepository()
  const sut = new CreateBookUseCase(findBookByTitleRepositorySpy, addBookRepositorySpy)
  return {
    sut,
    findBookByTitleRepositorySpy
  }
}

const makeFindBookByTitleRepository = () => {
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
      throw new DepError('findBookByTitleRepository')
    }
  }

  return new FindBookByTitleRepositorySpyWithError()
}

const makeAddBookRepository = () => {
  class AddBookRepository {

  }

  return new AddBookRepository()
}

describe('CreateBookUseCase', () => { 

  it('Should throw if no title is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute()
    await expect(promise).rejects.toThrow(new MissingParamError('title'))
  })

  it('Should throw if no publisher is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute('any title')
    await expect(promise).rejects.toThrow(new MissingParamError('publisher'))
  })

  it('Should throw if no photo is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute('any title', 'any publisher')
    await expect(promise).rejects.toThrow(new MissingParamError('photo'))
  })

  it('Should throw if no author is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.execute('any title', 'any publisher', 'any photo')
    await expect(promise).rejects.toThrow(new MissingParamError('authors'))
  })

  it('Should throw if no FindBookByTitleRepository is provided', async () => {
    const sut = new CreateBookUseCase()
    const promise = sut.execute('any title', 'any publisher', 'any photo', ['any author'])
    await expect(promise).rejects.toThrow(new MissingParamError('findBookByTitleRepository'))
  })

  it('Should throw if FindBookByTitleRepository has no find method', async () => {
    const invalidFindBookByTitleRepository = {}
    const sut = new CreateBookUseCase(invalidFindBookByTitleRepository)
    const promise = sut.execute('any title', 'any publisher', 'any photo', ['any author'])
    await expect(promise).rejects.toThrow(new InvalidParamError('findBookByTitleRepository'))
  })

  it('Should call FindBookByTitleRepository with correct title', async () => {
    const { sut, findBookByTitleRepositorySpy } = makeSut();
    const title = 'any title'
    await sut.execute(title, 'any publisher', 'any photo', ['any author'])
    expect(findBookByTitleRepositorySpy.title).toBe(title)
  })

  it('Should return false if the title already exists', async () => {
    const { sut } = makeSut();
    const created = await sut.execute('already existent title', 'any publisher', 'any photo', ['any author'])
    expect(created).toBe(false)
  })
 
  it('Should throw if FindBookByTitleRepository throws', async () => {
    const findBookByTitleRepositorySpyWithError = makeFindBookByTitleRepositorySpyWithError()
    const sut = new CreateBookUseCase(findBookByTitleRepositorySpyWithError);
    const promise = sut.execute('still inexistent title', 'any publisher', 'any photo', ['any author'])
    await expect(promise).rejects.toThrow(new DepError('findBookByTitleRepository'))
  })

  it('Should throw if no AddBookRepository is provided', async () => {
    const findBookByTitleRepositorySpy = makeFindBookByTitleRepository()
    const sut = new CreateBookUseCase(findBookByTitleRepositorySpy)
    const promise = sut.execute('any title', 'any publisher', 'any photo', ['any author'])
    await expect(promise).rejects.toThrow(new MissingParamError('addBookRepository'))
  })

})