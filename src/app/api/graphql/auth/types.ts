export const authTypes = `#graphql
    type User{
        id: String
        username: String
        email: String
    }

    type Query {
        hello: String   
    }

    type Mutation{
        register(username: String!, email: String!, password: String!): User!
    }
`;
