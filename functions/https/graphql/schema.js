import { gql } from 'apollo-server-express';

const schema = gql`

  type RoleGroups {
    roleGroupName: String
    description: String
  }
  
  type Roles {
    roleName: String
    description: String
  }
  
  type Query {
    version: String
    getRoleGroups: [RoleGroups]
    getRoles: [Roles]
  }
`;

export default schema;
