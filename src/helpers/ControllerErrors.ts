export class HttpError extends Error {
  httpStatus: Number = 404
}

export class InvalidPayload extends HttpError {
  constructor(missingKeys: string[], invalidTypedKeys: string[]) {
    let message = "Payload is invalid."
    if (missingKeys && missingKeys.length > 0) {
      message += ` Missing keys: ${missingKeys.join(", ")}.`
    }
    if (invalidTypedKeys && invalidTypedKeys.length > 0) {
      message += ` Types are invalid for keys: ${invalidTypedKeys.join(", ")}.`
    }
    super(message)
    this.httpStatus = 400
  }
}

export class InternalError extends HttpError {
  constructor(message: string) {
    super(message)
    this.httpStatus = 500
  }
}

export class ResourceNotFoundError extends HttpError {
  constructor(message: string) {
    super(message)
    this.httpStatus = 404
  }
}

export class ResourceAlreadyExistingError extends HttpError {
  constructor(message: string) {
    super(message)
    this.httpStatus = 409
  }
}