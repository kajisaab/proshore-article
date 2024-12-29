export default {
  authenticationSchema: {
    type: 'object',
    properties: {
      loginUserDetailRepsonse: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'email',
            example: 'amankhadka101@gmail.com'
          },
          fullName: {
            type: 'string',
            description: 'fullName',
            example: 'Aman Khadka'
          },
          role: {
            type: 'string',
            description: 'role',
            example: 'customer'
          },
          userName: {
            type: 'string',
            description: 'userName',
            example: 'kaji_saab'
          },
          profileImageUrl: {
            type: 'string',
            description: 'User profile image url',
            example: 'http://www.google.com'
          },
          accessToken: {
            type: 'string',
            description: 'accessToken',
            example: 'alsdjflsjfslkfjsldkfjsldfjlsakdfjklsdjfklasjfklasjflajslfjiruwpiurwoieruwoiruowiueruoiwcniwuoisjdfsfsakfjlaskfjlaksfja'
          },
          refreshToken: {
            type: 'string',
            description: 'refreshToken',
            example: 'alsdjflsjfslkfjsldkfjsldfjlsakdfjklsdjfklasjfklasjflajslfjiruwpiurwoieruwoiruowiueruoiwcniwuoisjdfsfsakfjlaskfjlaksfja'
          }
        }
      },
      signupUserDetailRequest: {
        type: 'object',
        required: ['email', 'firstName', 'lastName', 'password', 'userName'],
        properties: {
          email: {
            type: 'string',
            description: 'email',
            example: 'amankhadka101@gmail.com'
          },
          password: {
            type: 'string',
            description: 'password',
            example: 'Test@123'
          },
          firstName: {
            type: 'string',
            description: 'firstName',
            example: 'Aman'
          },
          lastName: {
            type: 'string',
            description: 'lastName',
            example: 'Khadka'
          },
        }
      },
      signupUserDetailsResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'message',
            example: 'Successfully created user'
          }
        }
      }
    }
  }
};
