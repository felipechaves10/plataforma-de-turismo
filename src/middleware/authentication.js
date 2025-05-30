
import { verificarToken } from "../utils/auth.js";

export const authenticate = (req, res, next) => {
     // Onde irá obter token do header authentication
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({mensagem: `Token de acesso não fornecido!`})
        return
    }

    try {
        // Verificar se o token é válido
        // Adicionar os dados decodificados do token na requisição
        const decoded = verificarToken(token)
        // res.json({decoded})
        // return
        req.user = decoded
        req.ehAdmin = decoded.type === 'admin'
        next()
    } catch (error) {
        res.status(403).json({mensagem: `Token inválido ou expirado! ${error.message}`})
    }

}
