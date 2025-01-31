import React from 'react'
import StatsCard from '../StatsCard'
import { upcomingEventLength } from '@/lib/actions/event/GetAllEvent'
import { Timer } from 'lucide-react'

const UpcommingEventsLength = async () => {
    const upcomingEventsLength = await upcomingEventLength()
  return (
    <div>
       <StatsCard
             
              icon={<Timer className="w-3.5 h-5 text-yellow-600" />}
              title={"Upcoming Events"}
              value={upcomingEventsLength.upcomingEvent}
              percentage={"+20.1% from last month"}
            />
    </div>
  )
}

export default UpcommingEventsLength
