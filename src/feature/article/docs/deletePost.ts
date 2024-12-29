export default {
  put: {
    tags: ['articles'], // Group the endpoint under "articles"
    summary: 'Delete article',
    description: 'This endpoint allows you to delete a specific article by its ID',
    operationId: 'deleteIndividualArticle',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'ID of the article to retrieve',
        schema: {
          type: 'string',
          example: '123'
        }
      }
    ],
    security: [
      {
        'X-XSRF-TOKEN': []
      }
    ],
    responses: {
      200: {
        description: 'Successfully deleted the article',
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
                      description: 'ID of the article',
                      example: 'Successfully deleted the Testing post'
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
                    example: 'Invalid article ID'
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
