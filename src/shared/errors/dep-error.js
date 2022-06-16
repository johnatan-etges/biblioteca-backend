module.exports = class DepError extends Error {
  constructor(param) {
    super(`The following dependency exited with an error: ${param}`)
    this.name = 'DepError'
  }
}