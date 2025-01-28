import React from 'react'
import ProfileContainer from '@/components/userProfile/profileContainer'
import { GetSingleUser } from '@/lib/actions/user/getAllUser'
import { IUser } from '@/lib/types';
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log(slug)
  const { status, data } = await GetSingleUser(slug);

  return (
    <div>
      <ProfileContainer user={data as unknown as IUser} />
    </div>
  );
};

export default page
