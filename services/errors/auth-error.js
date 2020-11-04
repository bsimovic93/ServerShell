class AuthError extends Error {
    constructor(message) {
      super(message)
      this.name = 'AuthError'
      this.message = message
    }
}

module.exports = AuthError;