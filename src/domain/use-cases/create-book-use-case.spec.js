class CreateBookUseCase{
  async execute(title, publisher, photo) {
    if (!title || !publisher || !photo) {
      throw new Error()
    }
  }
}

describe('CreateBookUseCase', () => { 

  it('Should throw if no title is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute()
    await expect(promisse).rejects.toEqual(new Error())
  })

  it('Should throw if no publisher is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute('any title')
    await expect(promisse).rejects.toEqual(new Error())
  })

  it('Should throw if no photo is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute('any title', 'any publisher')
    await expect(promisse).rejects.toEqual(new Error())
  })

})