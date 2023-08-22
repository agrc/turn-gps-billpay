import { gql } from 'apollo-server-express';

const schema = gql`

  type RoleGroups {
    roleGroupName: String
    description: String
  }
  
  type Query {
    "A simple type for getting started!"
    hello: String
    version: String
    getRoleGroups: [RoleGroups]
    getRoles: [String]
  }
`;

export default schema;