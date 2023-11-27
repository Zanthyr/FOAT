const catchAsync = require('../utils/catchAsync');

exports.getLanding = catchAsync(async (req, res, next) => {
  res.status(200).render('base', {
    title: 'All Tours'
  });
});
