// components/StatsCard.js

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value:  number;
  percentage: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  percentage,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row space-x-2 items-center md:justify-between space-y-0 pb-2">
        {icon}
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="text-2xl font-bold pt-2">{value}</div>
        <p className="text-xs text-muted-foreground">{percentage}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
