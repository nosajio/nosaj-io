module.exports = args => ({
  path: '/forms/hire-me',
  method: 'POST',
  handler: (req, res) => {
    const { body } = req;
    res.json(body);
  }
});
