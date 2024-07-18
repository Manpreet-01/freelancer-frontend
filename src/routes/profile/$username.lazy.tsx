import { AppliedJobsComp } from '@/components/profile/AppliedJobsComp';
import ViewProfile from '@/components/profile/ViewProfile';
import { getPublicProfile } from '@/lib/apiClient';
import { JobItem } from '@/types/job.types';
import { UserData } from '@/types/user.types';
import { createLazyFileRoute, redirect } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/$username')({
  component: PublicProfilePage,
  //@ts-ignore
  loader: publicProfileLoader,
});

type Params = {
  username: string;
};

async function publicProfileLoader({ params: { username } }: { params: Params; }) {
  try {
    const res = await getPublicProfile(username);
    const { user } = res.data.data;
    return user;
  } catch (err) {
    console.error("err in fetching public profile :: ", err);

    throw redirect({ to: '/notfound' });
  }
}

// for other users public profile
function PublicProfilePage() {
  const user = Route.useLoaderData<UserData>();

  return (
    <div>
      <ViewProfile user={user} />
      {/* TODO: add a logic for view previous work history of a freelancer, portfolio projects etc... */}
    </div>
  );
}