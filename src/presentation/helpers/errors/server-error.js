module.exports = class ServerError extends Error {
  constructor() {
    super(`Internal errror`)
    this.name = 'ServerError'
  }
}