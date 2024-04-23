import { FastifyInstance } from "fastify";

export async function launchRoutes(fastify: FastifyInstance){
    fastify.get('/', (req, reply) => {
        try{
            reply.send({message: 'Rota acessada com sucesso!'})
        } catch (err){
            reply.send(err)
        }
    })
}