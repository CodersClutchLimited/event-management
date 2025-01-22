'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import ProfileContainer from '@/components/userProfile/profileContainer';
import { userData } from '@/constants/sampleData';
import {formatDate} from '@/lib/utils'
const Page = () => {
  const { slug } = useParams(); 
  const user = userData.find((item) => item.id.toString() === slug);
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div className="w-full border-b flex flex-row mb-3 pb-4 items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-col space-y-3 items-center">
          <Avatar className=' h-36 w-36'>
            <AvatarImage src="/profile.jpeg" alt={`${user.firstName}'s profile`} />
          </Avatar>
          <h3 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h3>
          <span>Joined {formatDate(user.registeredAt)}</span>
        </div>
        {/*Right Section*/}
        <div className='flex flex-col space-y-2'>
        <Button className='bg-blue-700 font-bold'>Delete</Button>
        <Button className='font-bold bg-blue-700'>Suspend</Button>
        </div>
      </div>
      
      <ProfileContainer />
    </div>
  );
  };

export default Page;
