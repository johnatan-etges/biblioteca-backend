const { MissingParamError } = require('../../shared/errors')

module.exports = class CreateBookUseCase {
  constructor({ findBookByTitleRepository, addBookRepository } = {}) {
    this.findBookByTitleRepository = findBookByTitleRepository
    this.addBookRepository = addBookRepository
  }

  async execute({ title, publisher, photo, authors }) {
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

    const bookId = this.findBookByTitleRepository.find(title)

    if (bookId) {
      return false
    }

    await this.addBookRepository.add(title, publisher, photo, authors)

    return true
  }
}