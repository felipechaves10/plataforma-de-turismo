
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const newPlace = async (req, res) => {
    const { name, description, address, type, rating } = req.body

    try {
        const newPlace = await prisma.place.create({
            data: {
                name,
                description,
                address,
                type,
                rating
            }
        })

        res.status(201).json(newPlace)
    } catch (error) {
        res.status(400).json({mensagem: "Erro ao criar local!" + error.message})
    }
}

export const allPlace = async (req, res) => {
    try {
        const allPlace = await prisma.place.findMany()
        res.status(200).json(allPlace)
    } catch (error) {
        res.status(500).json({mensagem: `Erro ao listar todos os locais: ${error.message}`})
    }
}

export const listTypePlace = async (req, res) => {
    const { type } = req.body

    try {
        const local = await prisma.place.findMany({
            where: { type }
        })

        res.status(200).json(local)
    } catch (error) {
        res.status(500).json({ mensagem: `Erro ao buscar locais: ${error.message}`})
    }
}

export const updatePlace = async (req, res) => {
    const { id } = req.params
    const { name, description, address, type, rating } = req.body


    try {
        const updatePlace = await prisma.place.update({
            where: {id: Number(id)},
            data: {
                name,
                description,
                address,
                type,
                rating            }
        })
        
        res.status(200).json(updatePlace)
    } catch (error) {
        res.status(400).json({mensagem: `Erro ao atualizar locais: ${error.message}`})
    }
}

export const deletePlace = async (req, res) => {
    const { id } = req.params

    try {
        const deletePlace = await prisma.place.delete({
            where: {id: Number(id)}
        })

        res.status(200).json(deletePlace)
    } catch (error) {
        res.status(400).json({mensagem: `Erro ao deletar local: ${error.message}`})
    }
}
