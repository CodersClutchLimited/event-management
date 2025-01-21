import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ProfileContainer from '@/components/userProfile/profileContainer'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='w-full border-b flex flex-row'>
      <Avatar>
        <AvatarImage src='/profile.jpeg' />
      </Avatar>
      </div>
      <ProfileContainer/>
    </div>
  )
}

export default page
