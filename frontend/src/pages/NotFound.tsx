import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <h2 className="text-2xl font-semibold text-muted-foreground mt-2 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="max-w-md text-muted-foreground mb-8">
        The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/">Go Back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
