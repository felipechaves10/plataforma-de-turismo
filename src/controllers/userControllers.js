
import { PrismaClient } from "@prisma/client";
import { compararSenha, gerarToken, hashPassword } from "../utils/auth.js";
const prisma = new PrismaClient()


export const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body

    try {

        const senhaCriptografada = await hashPassword(password)

        const register = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: senhaCriptografada
            }
        })

        const token = gerarToken(register, 'user')

        res.status(201).json({
            name: register.name,
            email: register.email,
            token
        })
    } catch (error) {
        res.status(500).json({mensagem: `Erro ao registrar usuário: ${error.message}`})
    }
}

export const registerAdmin = async (req, res) => {
    const { name, email, phone, password } = req.body

    try {

        const senhaCriptografada = await hashPassword(password)

        const registerAdmin = await prisma.admin.create({
            data: {
                name,
                email,
                phone,
                password: senhaCriptografada
            }
        })

        const token = gerarToken(registerAdmin, 'admin')

        res.status(201).json({
            name: registerAdmin.name,
            email: registerAdmin.email,
            token
        })
    } catch (error) {
        res.status(500).json({mensagem: `Erro ao registrar Admin: ${error.message}`})
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Verificando se é User
        let user = await prisma.user.findUnique({
            where: { email }
        })

        // Verificando se é Admin
        let admin = await prisma.admin.findUnique({
            where: { email }
        })

        // Se encontrar User
        if (user) {
            const senhaCorreta = await compararSenha(password, user.password)

            if (!senhaCorreta) {
                return res.status(401).json({ mensagem: "Credenciais inválidas!" })
            }

            const token = gerarToken(user, 'user') // Gerando token para o User
            return res.json({ usuario: { name: user.name, email: user.email }, token })
        }

        // Se encontrar Admin
        if (admin) {
            const senhaCorreta = await compararSenha(password, admin.password)

            if (!senhaCorreta) {
                return res.status(401).json({ mensagem: "Credenciais inválidas!" })
            }

            const token = gerarToken(admin, 'admin') // Gerando token para o Admin
            return res.json({ usuario: { name: admin.name, email: admin.email }, token })
        }

        // Se não encontrar nem User nem Admin
        res.status(401).json({ mensagem: "Credenciais inválidas!" })

    } catch (error) {
        res.status(500).json({ mensagem: `Erro no login: ${error.message}` })
    }
}
