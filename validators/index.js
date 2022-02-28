exports.createPostValidator = (req, resp, next) => {
  // title
  req.check("title", "Title cannot be empty").notEmpty();
  req.check("title", "Title must be more than 2 charachters").isLength({
    min: 4,
    max: 150,
  });
  // body
  req.check("body", "Body cannot be empty").notEmpty();
  req.check("body", "Body must be more than 2 charachters").isLength({
    min: 4,
    max: 1000,
  });
  // check for all errors
  let errors = req.validationErrors();
  if (errors) {
    return resp.status(400).json({
      errors,
    });
  }
  // procced to next
  next();
};
