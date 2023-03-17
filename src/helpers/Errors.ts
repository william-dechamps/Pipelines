export class MissingDataError extends Error {
  constructor() {
    super("Some data are missing")
  }
}