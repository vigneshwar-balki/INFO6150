const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "RESTful API for user management",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/userRoutes.js"],
};

module.exports = swaggerJsdoc(options);
