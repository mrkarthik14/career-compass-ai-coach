
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: string;
}

const ProgressBar = ({ value, max, className, color = "bg-mentor-purple" }: ProgressBarProps) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("progress-bar", className)}>
      <div 
        className={cn("progress-value", color)} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
