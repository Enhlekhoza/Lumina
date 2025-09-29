import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "admin",
    title: "Admin",
    description: "Manage content, users, and analytics",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "student",
    title: "Student",
    description: "Access learning materials and resources",
    icon: GraduationCap,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "customer",
    title: "Customer",
    description: "Find support and documentation",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
];

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Lumina</h1>
      </header>

      <div className="flex-grow w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to Lumina
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent knowledge hub. Choose your role to get started
            with a personalized experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="shadow-card hover:shadow-elevated transition-all duration-300 border-border/50"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${role.gradient} flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {role.description}
                  </p>
                  <Button
                    onClick={() => navigate(`/${role.id}-dashboard`)}
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;