export class RepositoryError extends Error { }

export class DuplicateError extends RepositoryError {
  constructor(objectName: string, objectIdentifier: string) {
    super(`Object ${objectName}:${objectIdentifier} already exists in storage`)
  }
}

export class NoResultError extends RepositoryError {
  constructor(objectName: string, objectIdentifier: string) {
    super(`Object ${objectName}:${objectIdentifier} not found in storage`)
  }
}

export class ServerError extends RepositoryError {
  constructor(message: string) {
    super(message)
  }
}