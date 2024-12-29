export default {
  get: {
    tags: ['articles'], // Group the endpoint under "articles"
    summary: 'Get all articles',
    description: 'This endpoint allows you to get all articles',
    operationId: 'getAllArticles',
    security: [
      {
        'X-XSRF-TOKEN': []
      }
    ],
    responses: {
      200: {
        description: 'Successfully retrieved all articles',
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
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'ID of the article',
                        example: '123'
                      },
                      authorId: {
                        type: 'string',
                        description: 'ID of the author',
                        example: '456'
                      },
                      title: {
                        type: 'string',
                        description: 'Title of the article',
                        example: 'My First Article'
                      },
                      content: {
                        type: 'string',
                        description: 'Content of the article',
                        example: 'This is the content of the article.'
                      },
                      image: {
                        type: 'string',
                        nullable: true,
                        description: 'Path to the article image or null if no image exists',
                        example: '/uploads/article-image.jpg'
                      }
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
