
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Edit } from "lucide-react";
import { useState } from "react";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  verified: boolean;
}

const SkillsList = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", level: "Advanced", verified: true },
    { name: "TypeScript", level: "Intermediate", verified: true },
    { name: "Node.js", level: "Intermediate", verified: false },
    { name: "Python", level: "Beginner", verified: false },
    { name: "UI/UX Design", level: "Beginner", verified: false },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Skills & Expertise</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Manage Skills
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  {skill.verified && (
                    <BadgeCheck size={16} className="text-mentor-purple" />
                  )}
                </div>
                <span className="text-sm text-gray-500">{skill.level}</span>
              </div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-mentor-purple" 
                  style={{ 
                    width: skill.level === 'Advanced' ? '90%' : 
                          skill.level === 'Intermediate' ? '60%' : '30%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsList;
