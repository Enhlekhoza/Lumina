import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import MyCourses from "./MyCourses";
import RecommendedContent from "./RecommendedContent";
import MyBookmarks from "./MyBookmarks";
import SearchBar from "./SearchBar";
import UserManagementTable from "./UserManagementTable";

import {
  BookOpen, History, Bookmark, TrendingUp, Users,
  FileText, Search, Plus, Settings, Sparkles, User
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import useStoryblok from "@/hooks/useStoryblok";

// Map icon names (from Storyblok) to Lucide icons
const iconMap = {
  BookOpen, History, Bookmark, TrendingUp, Users,
  FileText, Search, Plus, Settings, Sparkles
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<'admin' | 'student' | 'customer' | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  useEffect(() => {
    const pathRole = location.pathname.split("/")[1]?.replace("-dashboard", "").toLowerCase();
    if (["admin", "student", "customer"].includes(pathRole)) {
      setUserRole(pathRole as 'admin' | 'student' | 'customer');
    } else {
      setUserRole(null);
    }
  }, [location.pathname]);

  const { story, loading, error } = useStoryblok(
    userRole ? `${userRole}-dashboard` : undefined,
    { version: "draft" }
  );

  if (!userRole || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? "Loading..." : "Invalid dashboard URL"}
    </div>
  );

  if (error || !story?.content) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-destructive mb-2">Content not found</h2>
      <p className="text-muted-foreground">
        Content for '{userRole}' is missing. Create a Storyblok story with slug:{" "}
        <code className="bg-muted p-1 rounded-sm">{userRole}-dashboard</code>
      </p>
      <Button className="mt-4" onClick={onLogout}>Go Back</Button>
    </div>
  );

  const rootBlock = story.content.body?.[0] || {};
  const actionButtons = rootBlock.body?.filter((b: any) => b.component === "action_button") || [];
  const stats = rootBlock.stats || [];
  const title = rootBlock.title || `Welcome, ${userRole}`;
  const subtitle = rootBlock.subtitle || "Here is your personalized dashboard.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Lumina</h1>
            <Badge variant="secondary" className="capitalize">{userRole}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="icon">
              <Link to="/profile"><User className="w-5 h-5" /></Link>
            </Button>
            <Button variant="outline" onClick={onLogout}>Go Back</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        {/* Single Search */}
        <div className="mb-8">
          <SearchBar
            userRole={userRole}
            className="max-w-2xl"
            onSearch={() => setAiAnswer(null)}
            onResults={(results) => setAiAnswer(results?.answer || "No answer")}
          />
          {aiAnswer && (
            <Card className="mt-4 max-w-2xl shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" /> AI Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{aiAnswer}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat: any, index: number) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] || FileText;
            return (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color || "text-primary"}`} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        {actionButtons.length > 0 && (
          <Card className="shadow-card mb-8">
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
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent transition-smooth"
                        variant="outline"
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
        )}

        {/* Role-specific */}
        {userRole === 'admin' && <UserManagementTable />}
        {userRole === 'student' && <MyCourses />}
        {userRole === 'customer' && <RecommendedContent />}
        {(userRole === 'student' || userRole === 'customer') && <MyBookmarks />}
      </main>
    </div>
  );
};

export default Dashboard;