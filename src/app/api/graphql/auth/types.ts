export const authTypes = `#graphql
    type User{
        id: String
        username: String
        email: String
    }

    type Username{
        id: String
        username: String
        userId: String
    }

    type Query {
        username(username: String!):  Username  
    }

    type Mutation{
        register(username: String!, email: String!, password: String!): User!
    }
`;
