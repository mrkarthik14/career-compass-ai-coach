
import { LucideIcon } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface GoalCardProps {
  title: string;
  progress: number;
  target: string;
  current: string;
  icon: LucideIcon;
  daysLeft: number;
  color?: string;
}

const GoalCard = ({
  title,
  progress,
  target,
  current,
  icon: Icon,
  daysLeft,
  color = "bg-mentor-purple"
}: GoalCardProps) => {
  return (
    <div className="mentor-card">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-lg", color.replace("bg-", "text-"))}>
          <Icon size={22} />
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <h3 className="font-medium mb-1">{title}</h3>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <ProgressBar value={progress} max={100} color={color} />
      </div>

      <div className="flex justify-between mt-4">
        <div className="text-sm">
          <span className="text-gray-500">{current}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">{target}</span>
        </div>
        <div className="text-sm text-red-400">
          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
        </div>
      </div>
    </div>
  );
};

import { cn } from "@/lib/utils";

export default GoalCard;
