
import express from 'express'
import { login, registerUser, registerAdmin } from '../controllers/userControllers.js'
import { validate } from '../middleware/validete.js'
import { createUserSchemas, createUserSchemasAdmin, loginSchema } from '../schemas/userSchemas.js'


const router = express.Router()

router.post("/register", validate(createUserSchemas), registerUser)

router.post("/register-adm", validate(createUserSchemasAdmin), registerAdmin)

router.post("/login", validate(loginSchema), login)



export default router
