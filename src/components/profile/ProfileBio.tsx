
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileBioProps {
  bio: string;
}

const ProfileBio = ({ bio }: ProfileBioProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileBio;
