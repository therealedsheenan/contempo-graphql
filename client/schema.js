export default `
  type Channel {
    id: ID!
    name: String
  }
  
  type Query {
    channels: [Channel]
  }
`;
