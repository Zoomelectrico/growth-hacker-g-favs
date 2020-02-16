const catchErrors = middlewareFunction =>
  function(req, res, next) {
    return middlewareFunction(req, res).catch(next);
  };

module.exports = {
  catchErrors,
};
