const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {

    // Create
    async createMovie(req, res) {
        const
            {
                title,
                releaseDate,
                genre,
                rating
            } = req.body

        const findMovieByTitle = await prisma.movie.findUnique({
            where: {
                title: String(title)
            }
        })

        if (findMovieByTitle) {
            return res.json('Filme já existe, adicione outro!')
        }
        else {
            await prisma.movie.create({
                data: {
                    title,
                    releaseDate,
                    genre,
                    rating
                }
            })
        }
        return res.json('Filme adicionado!')
    },

    // Read
    async listMovies(req, res) {
        const listMovies = await prisma.movie.findMany()

        return res.json(listMovies)
    },

    // Update
    async updateMovie(req, res) {
        const
            {
                title,
                releaseDate,
                genre,
                rating
            } = req.body

        const { id } = req.params

        const findMovieByTitle = await prisma.movie.findUnique({
            where: {
                title: String(title)
            }
        })

        const findMovieById = await prisma.movie.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!findMovieById) {
            return res.json('Filme não encontrado!')
        }

        if (findMovieByTitle) {
            return res.json('Filme já existe, adicione outro!')
        }

        else {
            await prisma.movie.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title,
                    releaseDate,
                    genre,
                    rating
                }
            })
        }

        return res.json('Filme atualizado!')
    },

    // Delete
    async deleteMovie(req, res) {
        const { id } = req.params

        const findMovieById = await prisma.movie.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!findMovieById) {
            return res.json('Filme não encontrado!')
        }

        else {
            await prisma.movie.delete({
                where: {
                    id: Number(id)
                }
            })
        }

        return res.json('Filme excluído!')
    }
}