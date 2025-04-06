
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CareerPath = {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  demand: "High" | "Medium" | "Low";
  matchPercentage: number;
  requiredSkills: string[];
  topCompanies: string[];
  growthPotential: string;
  icon: React.ElementType;
};

interface CareerPathCardProps {
  careerPath: CareerPath;
  isSelected: boolean;
  onSelect: () => void;
}

const CareerPathCard = ({ careerPath, isSelected, onSelect }: CareerPathCardProps) => {
  const { title, description, matchPercentage, icon: Icon, demand } = careerPath;
  
  return (
    <div 
      className={cn(
        "mentor-card cursor-pointer transition-all hover:border-mentor-purple",
        isSelected && "border-2 border-mentor-purple"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <div 
          className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center",
            matchPercentage >= 85 ? "bg-green-100 text-green-600" : 
            matchPercentage >= 70 ? "bg-yellow-100 text-yellow-600" : 
            "bg-gray-100 text-gray-600"
          )}
        >
          <Icon size={24} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span 
              className={cn(
                "text-sm font-medium",
                matchPercentage >= 85 ? "text-green-600" : 
                matchPercentage >= 70 ? "text-yellow-600" : 
                "text-gray-600"
              )}
            >
              {matchPercentage}% match
            </span>
            {demand === "High" && (
              <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                High Demand
              </span>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mt-3 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-1 mt-3">
        {careerPath.requiredSkills.slice(0, 3).map((skill) => (
          <span 
            key={skill} 
            className="bg-mentor-purple/10 text-mentor-purple px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
          >
            <BadgeCheck size={12} />
            {skill}
          </span>
        ))}
        {careerPath.requiredSkills.length > 3 && (
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            +{careerPath.requiredSkills.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-mentor-purple hover:text-mentor-purple hover:bg-mentor-purple/10"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          View Details
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Save Path
        </Button>
      </div>
    </div>
  );
};

export default CareerPathCard;
