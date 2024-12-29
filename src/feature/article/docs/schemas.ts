export default {
  articleSchema: {
    type: 'object',
    properties: {
      createArticleRequest: {
        type: 'object',
        required: ['title', 'content'],
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
            description: 'Image file for the article'
          }
        }
      },
      createArticleResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID of the created article',
            example: 1
          },
          title: {
            type: 'string',
            description: 'Title of the created article',
            example: 'My First Article'
          },
          content: {
            type: 'string',
            description: 'Content of the created article',
            example: 'This is the content of my first article.'
          },
          image: {
            type: 'string',
            description: 'Path to the uploaded image or null if no image was uploaded',
            example: '/uploads/12345-image.jpg'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the article was created',
            example: '2023-12-28T12:34:56Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the article was last updated',
            example: '2023-12-28T12:34:56Z'
          }
        }
      },
      getArticlesResponse: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/articleSchema/properties/createArticleResponse'
        }
      },
      updateArticleRequest: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Updated title of the article',
            example: 'Updated Article Title'
          },
          content: {
            type: 'string',
            description: 'Updated content of the article',
            example: 'This is the updated content of the article.'
          },
          image: {
            type: 'string',
            format: 'binary',
            description: 'Updated image file for the article'
          }
        }
      },
      updateArticleResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID of the updated article',
            example: 1
          },
          title: {
            type: 'string',
            description: 'Updated title of the article',
            example: 'Updated Article Title'
          },
          content: {
            type: 'string',
            description: 'Updated content of the article',
            example: 'This is the updated content of the article.'
          },
          image: {
            type: 'string',
            description: 'Path to the uploaded image or null if no image was uploaded',
            example: '/uploads/updated-image.jpg'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the article was created',
            example: '2023-12-28T12:34:56Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the article was last updated',
            example: '2023-12-28T12:50:00Z'
          }
        }
      }
    }
  }
};
