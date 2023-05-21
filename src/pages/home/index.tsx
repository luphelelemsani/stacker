import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User, fetchUsers } from "../../store/reducers/users-reducer";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../../hooks/reduxHook";
import UserProfile from "../../components/user-profile";
import { sortUsers, filterUsersByName } from "../../utils/sortAndFilter";


const UsersComponent: React.FC = () => {

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const { users: allUsers, status: usersStatus, error: usersError } = useAppSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(fetchUsers({ page, sortOrder}));
  }, [dispatch, page, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const users = sortUsers(filterUsersByName(allUsers, filter), sortOrder);


  const handleSortOrderChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };



  // Handle loading, error, and empty states
  if (usersStatus === 'loading') {
    return <div>Loading...</div>
  } else if (usersStatus === 'failed') {
    return <div>Error: {usersError}</div>
  }

  return (
    <div>
      <button onClick={() => handlePageChange(page - 1)}>Previous page</button>
      <button className="ml-2" onClick={() => handlePageChange(page + 1)}>Next page</button>
      <button className="ml-2" onClick={() => handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Change sort order
      </button>
      <input
        type="text"
        placeholder="Filter users"
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      {!users.length ? <div>No users found</div> : users.map((user: User) => (
        <div key={user.id}>
          <UserProfile user={user} />
        </div>
      ))}
    </div>
  );
};

export default UsersComponent;
