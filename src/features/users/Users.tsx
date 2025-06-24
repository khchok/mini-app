import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '@/store/users-slice';
import type { AppDispatch } from '@/store';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/hooks';

function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card className="p-5">
      <h2>Async Users</h2>
      <Button onClick={() => dispatch(fetchUsers())}>Fetch Users</Button>
      <h3>User List</h3>
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
