import ViewProfile from '@/components/profile/ViewProfile';
import { userData } from '@/types/user.types';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(profile)/profile/$username')({
  component: PublicProfilePage,
  //@ts-ignore
  loader: publicProfileLoader,
});

type Params = {
  username: string;
};

async function publicProfileLoader({ params: { username } }: { params: Params; }) {
  console.log(username);
  const user = {
    "_id": "6682a4802865957d769bd4d1",
    "name": "John doe",
    "username": "john",
    "email": "johndoe27@gmail.com",
    "role": "client",
    "createdAt": "2024-07-01T12:43:44.130Z",
    "updatedAt": "2024-07-01T12:43:44.130Z",
    "__v": 2,
    "appliedJobs": [],
    "savedJobs": [],
    "isAvailableNow": false
  };
  return user;
}

function PublicProfilePage() {
  const user = Route.useLoaderData<userData>();
  console.log(user);

  return (
    <div>
      <ViewProfile user={user} />
    </div>
  );
}