import Fastify, { FastifyInstance } from 'fastify'
export function createServer(): FastifyInstance {
  const fastify = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  })
  return fastify
}
