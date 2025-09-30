import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // In a real app, you'd fetch this data
  const user = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    role: "Student",
    avatarUrl: "https://github.com/shadcn.png", 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Button asChild variant="outline" className="mb-4">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl">{user.name}</CardTitle>
            <p className="text-muted-foreground">{user.role}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <p className="font-semibold text-foreground">Email</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            {/* Add more profile fields here */}
            <Button className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
