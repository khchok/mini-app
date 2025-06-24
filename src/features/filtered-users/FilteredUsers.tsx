import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers, setSearch } from '@/store/users-slice';
import type { AppDispatch } from '@/store';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { selectFilteredUsers } from '../users/users-selectors';
import { useAppSelector } from '@/hooks';
import { Input } from '@/components/ui/input';

function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useAppSelector(selectFilteredUsers);
  const search = useAppSelector((state) => state.users.search);
  const { loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card className="p-5">
      <h2>Async Users with createSelector</h2>
      <Button onClick={() => dispatch(fetchUsers())}>Fetch Users</Button>
      <h3>User List</h3>
      <Input
        type="text"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <ul>
        {loading && (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-auto" />
            <Skeleton className="h-6 w-auto" />
            <Skeleton className="h-6 w-auto" />
          </div>
        )}
        {!loading && users.map((u) => <li key={u.id}>{u.name}</li>)}
      </ul>
    </Card>
  );
}

export default Users;
