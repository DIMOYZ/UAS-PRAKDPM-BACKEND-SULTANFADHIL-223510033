const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'API Documentation',
    description: 'API Documentation with express-jsdoc-swagger',
  },
  baseDir: __dirname,
  filesPattern: './routes/*.js',
  swaggerUIPath: '/api-docs', // Diubah dari '/' ke '/api-docs' untuk menghindari konflik
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  multiple: false, // Diubah ke false jika hanya ada satu set dokumentasi
};

const setupSwagger = (app) => {
  // Hanya mengatur Swagger jika berada di lingkungan pengembangan
  if (process.env.NODE_ENV === 'development') {
    expressJSDocSwagger(app)(options);
  }
};

module.exports = setupSwagger;
