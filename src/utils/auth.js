import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10
const JWT_SECRET = process.env.JWT_SECRET

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

export const gerarToken = (user, type) => {
    return jwt.sign(
        {id: user.id, email: user.email, type: type},
        JWT_SECRET,
        {expiresIn: "1h"}
    )
}

export const compararSenha = async (password, senhaCriptografada) => {
    return await bcrypt.compare(password, senhaCriptografada)
}

export const verificarToken = (token) => {
    return jwt.verify(token,JWT_SECRET)
}