export const feedbackTypes = `#graphql

    type UpvotedBy{
        id: String
        userId: String
        feedbackId: String
    }

    type Feedback{
        id: String   
        title: String
        tag: String
        details: String    
        upvotes: Int       
        numberOfComments: Int
        upvotedBy: [UpvotedBy]      
    }

    type Query{
        getFeedbacks(filterTag: String, sort: String): [Feedback!]!

        getFeedback(feedbackId: String!): Feedback 
    }

    type Mutation{
        addFeedback(title: String!, tag: String!, details: String!): Feedback

        upvote(feedbackId: String!): Feedback!
    }
`;
