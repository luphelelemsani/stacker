import { User } from "../store/reducers/users-reducer";

export const filterUsersByName = (users: User[], filter: string) => {
    return users.filter((user) => user.display_name.toLowerCase().includes(filter.toLowerCase()));
  };
  
export const sortUsers = (users: User[], sortOrder: 'asc' | 'desc') => {
    return users.sort((a, b) => {
      const nameA = a.display_name.toLowerCase();
      const nameB = b.display_name.toLowerCase();
  
      if (nameA < nameB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
  
      if (nameA > nameB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
  
      return 0; // names are equal
    });
  };
  