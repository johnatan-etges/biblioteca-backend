const { MissingParamError, InvalidParamError, DepError } = require('../../shared/errors')

module.exports = class CreateBookUseCase {
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
      return false
    }

    return true
  }
}