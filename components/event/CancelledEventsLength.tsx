import React from 'react'
import StatsCard from '../StatsCard'
import { canceledEventLength } from '@/lib/actions/event/GetAllEvent'
import { Timer } from 'lucide-react'

const CancelledEventsLength = async () => {
    const upcomingEventsLength = await canceledEventLength()
  return (
    <div>
       <StatsCard
             
              icon={<Timer className="w-3.5 h-5 text-destructive" />}
              title={"Cancelled Events"}
              value={upcomingEventsLength.canceledEvent ?? 0}
              percentage={"+20.1% from last month"}
            />
    </div>
  )
}

export default CancelledEventsLength
