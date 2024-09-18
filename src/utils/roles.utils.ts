export enum Role {
    Admin = "admin",
    User = "user",
    Sales = "salesRep",
  }
  
  export const permissions = {
    createProduct: [Role.Admin, Role.Sales],
    updateProduct: [Role.Admin],
    getProduct: [Role.Admin, Role.User, Role.Sales],
    deleteProduct: [Role.Admin, Role.User],
    createPost: [Role.Admin],
    updatePost: [Role.Admin],
    getPost: [Role.Admin, Role.User], 
    deletePost: [Role.Admin],
  };
  