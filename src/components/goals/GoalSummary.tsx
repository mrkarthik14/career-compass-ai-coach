
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GoalSummaryProps {
  title: string;
  count: number;
  description: string;
  icon: LucideIcon;
  color: string;
}

const GoalSummary = ({ title, count, description, icon: Icon, color }: GoalSummaryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className={cn("p-2.5 rounded-lg", color)}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{count}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSummary;
