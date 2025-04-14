import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Task API',
    version: '1.0.0',
    description: 'Documentação da API de tarefas com autenticação JWT',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http' as const,         // <-- Literal type "http"
        scheme: 'bearer' as const,     // <-- Literal type "bearer"
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {}, // Aqui pode ficar vazio, pois será preenchido pelos comentários nas rotas
};

const options = {
  definition,
  apis: ['src/routes/*.ts'], // Comentários Swagger nas rotas
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
