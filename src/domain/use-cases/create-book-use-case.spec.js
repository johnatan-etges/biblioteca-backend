const { MissingParamError } = require("../../shared/errors")

class CreateBookUseCase{
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
  }
}

describe('CreateBookUseCase', () => { 

  it('Should throw if no title is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute()
    await expect(promisse).rejects.toEqual(new MissingParamError('title'))
  })

  it('Should throw if no publisher is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute('any title')
    await expect(promisse).rejects.toEqual(new MissingParamError('publisher'))
  })

  it('Should throw if no photo is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute('any title', 'any publisher')
    await expect(promisse).rejects.toEqual(new MissingParamError('photo'))
  })

  it('Should throw if no author is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute('any title', 'any publisher', 'any photo')
    await expect(promisse).rejects.toEqual(new MissingParamError('authors'))
  })

})