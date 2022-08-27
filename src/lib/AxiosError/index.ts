/**
 * Base Error class.
 * Consider this class as an abstract class type
 */
export class ErrorResponse extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.status = status;
    this.name = 'Error Response';
  }
}

/**
 * Error to be thrown when the endpoint is not reachable
 */
export class UnreachableResponse extends ErrorResponse {
  constructor(public message: string, public status: number) {
    super(message, status);
    this.name = 'Unreachable Response';
  }
}

/**
 * Error to be thrown when the endpoint returns a response with an error
 */
export class InternalServerError extends ErrorResponse {
  constructor(public message: string, public status: number) {
    super(message, status);
    this.name = 'Internal Server Error';
  }
}
