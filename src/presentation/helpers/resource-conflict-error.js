module.exports = class ResourceConflictError extends Error {
  constructor(type, name) {
    super(`Resource already exists. Type: ${type}; Name: ${name}`)
    this.name = 'ResourceConflictError'
  }
}