const { MissingParamError, InvalidParamError } = require("../../shared/errors")

class CreateBookUseCase{
  constructor(findBookByTitleRepository) {
    this.findBookByTitleRepository = findBookByTitleRepository
  }

  async execute(title, publisher, photo, authors) {    
    if (!title) {
      throw new MissingParamError('title')
    }
    if (!publisher) {
      throw new MissingParamError('publisher')
    }
    if (!photo) {
      throw new MissingParamError('photo')
    }
    if (!authors) {
      throw new MissingParamError('authors')
    }

    if (!this.findBookByTitleRepository) {
      throw new MissingParamError('findBookByTitleRepository')
    }

    if (!this.findBookByTitleRepository.find) {
      throw new InvalidParamError('findBookByTitleRepository')
    }

    const bookId = this.findBookByTitleRepository.find(title)

    if (bookId) {
      this.created = false
    }

    return this.created
  }
}
class FindBookByTitleRepositorySpy {
  find(title) {
    this.title = title
    return 'any book id'
  }
}

const makeSut = () => {
  const findBookByTitleRepositorySpy = new FindBookByTitleRepositorySpy()
  const sut = new CreateBookUseCase(findBookByTitleRepositorySpy)
  return {
    sut,
    findBookByTitleRepositorySpy
  }
}

describe('CreateBookUseCase', () => { 

  it('Should throw if no title is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.execute()
    await expect(promisse).rejects.toEqual(new MissingParamError('title'))
  })

  it('Should throw if no publisher is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.execute('any title')
    await expect(promisse).rejects.toEqual(new MissingParamError('publisher'))
  })

  it('Should throw if no photo is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.execute('any title', 'any publisher')
    await expect(promisse).rejects.toEqual(new MissingParamError('photo'))
  })

  it('Should throw if no author is provided', async () => {
    const { sut } = makeSut()
    const promisse = sut.execute('any title', 'any publisher', 'any photo')
    await expect(promisse).rejects.toEqual(new MissingParamError('authors'))
  })

  it('Should throw if no FindBookByTitleRepository is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute('any title', 'any publisher', 'any photo', ['any author'])
    await expect(promisse).rejects.toEqual(new MissingParamError('findBookByTitleRepository'))
  })

  it('Should throw if FindBookByTitleRepository has no find method', async () => {
    const invalidFindBookByTitleRepository = {}
    const sut = new CreateBookUseCase(invalidFindBookByTitleRepository)
    const promisse = sut.execute('any title', 'any publisher', 'any photo', ['any author'])
    await expect(promisse).rejects.toEqual(new InvalidParamError('findBookByTitleRepository'))
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

})