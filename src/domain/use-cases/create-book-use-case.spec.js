class CreateBookUseCase{
  async execute(title) {
    if (!title) {
      throw new Error()
    }
  }
}

describe('CreateBookUseCase', () => { 
  it('Should throw if no title is provided', async () => {
    const sut = new CreateBookUseCase()
    const promisse = sut.execute()
    expect(promisse).rejects.toEqual(new Error())
  })
})