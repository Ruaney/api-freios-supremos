export class ErrorHandler {
  construct(){}

  handle(err, req, res, next) {
    console.log('Typeof', typeof err);
    console.log('Error handler', err);
    return res.status(500).send();
  }
}