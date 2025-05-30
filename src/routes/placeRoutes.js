
import express from 'express'
import { allPlace, deletePlace, listTypePlace, newPlace, updatePlace } from '../controllers/placeControllers.js'
import { validate } from '../middleware/validete.js'
import { placeSchemas } from '../schemas/placeSchemas.js'
import { authenticate } from '../middleware/authentication.js'
import { isAdmin } from '../middleware/isAdmin.js'


const router = express.Router()

router.post("/novo-lugar", authenticate, isAdmin, validate(placeSchemas), newPlace)

router.get("/listar-todos", authenticate, allPlace)

router.get("/listar-tipo",authenticate, listTypePlace)

router.put("/local/:id", authenticate, isAdmin, updatePlace)

router.delete("/deletar-local/:id", authenticate, isAdmin, deletePlace)

export default router
