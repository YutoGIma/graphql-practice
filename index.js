const { ApolloServer, gql } = require('apollo-server');

const users = [
    {id: "1", name: "Amanda", email: "amanda@example.com"},
    {id: "2", name: "Billy", email: "billy@example.com"},
]

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query{
        hello(name: String!): String
        users: [User]
        user(id: ID!): User
    }
`

const resolvers = {
    Query: {
        hello: (parent, args) =>{
            return `Hello ${args.name}`;
        },
        users: () => users,
        user: (parent, args) => {
            const user = users.find((user) => user.id === args.id);
            return user;
        },
    },
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(3002).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});