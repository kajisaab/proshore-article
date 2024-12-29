export default {
  put: {
    tags: ['articles'], // Group the endpoint under "articles"
    summary: 'Update an article',
    description: 'This endpoint allows you to update an existing article by its ID.',
    operationId: 'updateArticle',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the article to update',
        schema: {
          type: 'string',
          example: '123'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
              title: {
                type: 'string',
                description: 'Title of the article',
                example: 'Updated Title'
              },
              content: {
                type: 'string',
                description: 'Content of the article',
                example: 'This is the updated content of the article.'
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
      200: {
        description: 'Successfully updated the article',
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
                  example: 'Successfully updated post'
                },
                data: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID of the updated article',
                      example: '123'
                    },
                    title: {
                      type: 'string',
                      description: 'Updated title of the article',
                      example: 'Updated Title'
                    },
                    content: {
                      type: 'string',
                      description: 'Updated content of the article',
                      example: 'This is the updated content of the article.'
                    },
                    featuredImage: {
                      type: 'string',
                      description: 'Base64 string of the updated image or null if no image was provided',
                      example: 'data:image/jpeg;base64,...'
                    },
                    lastModifiedOn: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Timestamp when the article was last updated',
                      example: '2024-12-29T14:23:45Z'
                    }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Invalid request data or article not found',
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
                  example: 'Cannot find the post to update'
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
                  example: 'Unexpected error occurred'
                }
              }
            }
          }
        }
      }
    }
  }
};
