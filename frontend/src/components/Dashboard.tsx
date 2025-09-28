import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";
import useStoryblok from "@/hooks/useStoryblok";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  History, 
  Bookmark, 
  TrendingUp, 
  Users, 
  FileText,
  Search,
  Plus,
  Settings,
  Sparkles  // <-- added this
} from "lucide-react";

interface DashboardProps {
  userRole: 'admin' | 'student' | 'customer';
  onLogout: () => void;
}

// A mapping from string names to Lucide icons
const iconMap = {
  BookOpen,
  History,
  Bookmark,
  TrendingUp,
  Users,
  FileText,
  Search,
  Plus,
  Settings,
  Sparkles
};

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  
  // Determine the Storyblok slug based on the user's role
  const slug = `${userRole}-dashboard`;

  // Fetch role-specific content from Storyblok
  const { story, loading, error } = useStoryblok(slug, { version: "draft" });

  const handleSearch = (query: string) => {
    console.log("User searched for:", query);
    setAiAnswer(null); // Clear previous answer
  };

  const handleResults = (results: any) => {
    if (results && results.answer) {
      setAiAnswer(results.answer);
    } else {
      setAiAnswer("Sorry, I couldn't find an answer to that question.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const content = story?.content;
  const actionButtons = content?.Body?.filter((block: any) => block.component === 'action_button') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Lumina</h1>
              <Badge variant="secondary" className="capitalize">{userRole}</Badge>
            </div>
            <Button variant="outline" onClick={onLogout}>Go Back</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-destructive mb-2">Content not found</h2>
            <p className="text-muted-foreground">
              It looks like the content for the '{userRole}' role hasn't been created yet.
              <br />
              Please create a new story in Storyblok with the slug: <code className="bg-muted p-1 rounded-sm">{slug}</code>
            </p>
          </div>
        ) : (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">{content?.title || `Welcome, ${userRole}`}</h2>
              <p className="text-muted-foreground text-lg">{content?.subtitle || 'Here is your personalized dashboard.'}</p>
            </div>

            {/* Search Section */}
            <div className="mb-8">
              <SearchBar 
                onSearch={handleSearch}
                onResults={handleResults}
                placeholder="What would you like to know?"
                className="max-w-2xl"
              />
              {aiAnswer && (
                <Card className="mt-4 max-w-2xl shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-primary" />
                      AI Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{aiAnswer}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {content?.stats?.map((stat: any, index: number) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap] || FileText;
                return (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <Icon className={`w-8 h-8 ${stat.color || 'text-primary'}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {actionButtons.map((action: any, index: number) => {
                    const Icon = iconMap[action.icon as keyof typeof iconMap] || Plus;
                    return (
                      <Link to={`/content/${action.link}`} key={index}>
                        <Button
                          variant="outline"
                          className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent transition-smooth"
                        >
                          <Icon className="w-6 h-6 text-primary" />
                          <span className="text-sm font-medium">{action.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;