/**
 * @param {string} message The error message to send to the client.
 * @param {} data Any extra data required by the client.
 */
export default class ErrorResponse {
    constructor(message, data) {
      this.error = true;
      this.message = message;
      this.data = data;
    }
}