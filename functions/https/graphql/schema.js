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
  
  type Exists {
    loginExists: Int
  }
  
  type Query {
    version: String
    getRoleGroups: [RoleGroups]
    getRoles: [Roles]
    checkLoginExists(orgName: String, loginName:String): Exists
  }
  }
`;

export default schema;
