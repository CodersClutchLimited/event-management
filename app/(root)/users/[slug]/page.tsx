import React from "react";
import { GetSingleUser } from '@/lib/actions/user/getAllUser'
import {IUser} from "@/lib/types";
import ProfileContainer from "@/components/userProfile/profileContainer";


const page = async ({params} : {params: {slug: string}}) => {
  const {slug} = await params;
  console.log(slug);
  // find user base on user id
  const {data} = await GetSingleUser(slug);

  return (
    <div>
      <ProfileContainer user={data as unknown as IUser} />
    </div>
  );
};

export default page;
