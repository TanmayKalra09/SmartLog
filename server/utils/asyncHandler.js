// Wrapper function to handle asynchronous route handlers and forward errors to Express
const asycnHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default asycnHandler;
