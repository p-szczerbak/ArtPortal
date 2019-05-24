
const workOfArt = (req, res) => {
  // res.json({
  //   name,
  //   description,
  //   version,
  //   uptime: process.uptime()
  // })
  res.json({
    name: 'awesome suclpture',
    description: 'fvdfvgvgbbg',
    image: 'path/to/image',
    author: 'Klimt',
    type: 'sculpture'
  })
}

module.exports = workOfArt
