const { checkHash, generateAccessToken } = require('../helpers/auth')
const { User } = require('../models')

exports.login = async (req, res) => {
  const { body, errors } = req
  try {
    if (errors) throw new Error('Validation Error')
    const { username, password } = body

    let user = await User.findOne({ attributes: ['id', 'name', 'username', 'password'], where: { username } })
    if (!user) return res.send({ message: 'User not found' })
    if (!checkHash(password, user.password)) return res.send({ message: 'Password was wrong' })

    user = user.dataValues
    delete user.password
    const token = generateAccessToken(user)
    user.token = token

    return res.send({
      message: 'Successfully retrieving user data',
      data: user
    })
  } catch (error) {
    if (error.message === 'Validation Error') return res.send(errors)

    res.status(401).send({ message: "There's an error while loging in. try again" })
  }
}