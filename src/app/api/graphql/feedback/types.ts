export const feedbackTypes = `#graphql

    type Feedback{
        id: String   
        title: String
        tag: String
        details: String    
        upvotes: Int       
        numberOfComments: Int       
    }

    type Query{
        getFeedbacks: [Feedback!]

        getFeedback(feedbackId: String!): Feedback 
    }

    type Mutation{
        addFeedback(title: String!, tag: String!, details: String!): Feedback
    }
`;
