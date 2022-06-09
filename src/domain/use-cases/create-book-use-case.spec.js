class CreateBookUseCase{
  async execute(title, publisher) {
    if (!title || !publisher) {
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

})