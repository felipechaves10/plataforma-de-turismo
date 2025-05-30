
import { verificarToken } from "../utils/auth.js"

export const isAdmin = async (req, res, next) => {
    
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({mensagem: "Token de acesso não fornececido!"})
        return
    }

    try {
        const decoded = verificarToken(token)

        if (decoded.type !== 'admin') {
             return res.status(403).json({ mensagem: 'Acesso negado. Apenas administradores.'})
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({mensagem: `Token inválido ou expirado! ${error.message}`})
    }
}
