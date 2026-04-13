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
    paths: {
      "/user/create": {
        post: {
          summary: "Create a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullName", "email", "password"],
                  properties: {
                    fullName: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  example: { message: "User created successfully." },
                },
              },
            },
            400: {
              description: "Validation failed",
              content: {
                "application/json": {
                  example: { error: "Validation failed." },
                },
              },
            },
          },
        },
      },
      "/user/edit": {
        put: {
          summary: "Update user full name or password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string" },
                    fullName: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User updated successfully",
              content: {
                "application/json": {
                  example: { message: "User updated successfully." },
                },
              },
            },
            400: {
              description: "Validation failed",
              content: {
                "application/json": {
                  example: { error: "Validation failed." },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  example: { error: "User not found." },
                },
              },
            },
          },
        },
      },
      "/user/delete": {
        delete: {
          summary: "Delete a user by email",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User deleted successfully",
              content: {
                "application/json": {
                  example: { message: "User deleted successfully." },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  example: { error: "User not found." },
                },
              },
            },
          },
        },
      },
      "/user/getAll": {
        get: {
          summary: "Get all users",
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      users: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fullName: { type: "string" },
                            email: { type: "string" },
                            password: { type: "string" },
                            imagePath: { type: "string", nullable: true },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/user/uploadImage": {
        post: {
          summary: "Upload an image for a user",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["email", "image"],
                  properties: {
                    email: { type: "string" },
                    image: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Image uploaded successfully",
              content: {
                "application/json": {
                  example: {
                    message: "Image uploaded successfully.",
                    filePath: "/images/filename.ext",
                  },
                },
              },
            },
            400: {
              description: "Invalid file format or image already exists",
              content: {
                "application/json": {
                  examples: {
                    invalidFileFormat: {
                      value: {
                        error:
                          "Invalid file format. Only JPEG, PNG, and GIF are allowed.",
                      },
                    },
                    imageExists: {
                      value: {
                        error: "Image already exists for this user.",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  example: { error: "User not found." },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
