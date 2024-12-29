export default {
  post: {
    tags: ['articles'], // Group the endpoint under "articles"
    summary: 'Create a new article',
    description: 'This endpoint allows you to create a new article with an optional image upload.',
    operationId: 'createArticle',
    security: [
      {
        'X-XSRF-TOKEN': []
      }
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            required: ['title', 'content'], // Title and content are required
            properties: {
              title: {
                type: 'string',
                description: 'Title of the article',
                example: 'My First Article'
              },
              content: {
                type: 'string',
                description: 'Content of the article',
                example: 'This is the content of my first article.'
              },
              image: {
                type: 'string',
                format: 'binary',
                description: 'Optional image file for the article'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Article created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: '0',
                },
                message: {
                  type: 'string',
                  example: 'SUCCESS'
                },
                data: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Success message',
                      example: 'Successfully created article'
                    }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Invalid request data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: '-1'
                },
                message: {
                  type: 'string',
                  example: 'Validation Error'
                },
                errors: {
                  type: 'array',
                  items: {
                    type: 'string',
                    example: 'Title is required'
                  }
                }
              }
            }
          }
        }
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: '-1'
                },
                message: {
                  type: 'string',
                  example: 'Internal Server Error'
                },
                error: {
                  type: 'string',
                  example: 'Database connection failed'
                }
              }
            }
          }
        }
      }
    }
  }
};
