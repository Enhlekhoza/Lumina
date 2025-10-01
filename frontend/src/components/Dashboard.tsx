import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import MyCourses from "./MyCourses";
import RecommendedContent from "./RecommendedContent";
import MyBookmarks from "./MyBookmarks";
import UserManagementTable from "./UserManagementTable";
import SearchBar from "./SearchBar";

import {
  BookOpen, History, Bookmark, TrendingUp, Users,
  FileText, Search, Plus, Settings, Sparkles, User
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import useStoryblok from "@/hooks/useStoryblok";
import StoryblokClient from "storyblok-js-client";

// Map icon names (from Storyblok) to Lucide icons
const iconMap = {
  BookOpen, History, Bookmark, TrendingUp, Users,
  FileText, Search, Plus, Settings, Sparkles
};

// Determine token & version for Storyblok
const STORYBLOK_VERSION = "published"; // force published for your live articles
const STORYBLOK_TOKEN = import.meta.env.VITE_STORYBLOK_PUBLIC_TOKEN;

// Storyblok client for fetching articles
const sb = new StoryblokClient({ accessToken: STORYBLOK_TOKEN });

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<'admin' | 'student' | 'customer' | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  // Detect user role from URL
  useEffect(() => {
    const pathRole = location.pathname.split("/")[1]?.replace("-dashboard", "").toLowerCase();
    if (["admin", "student", "customer"].includes(pathRole)) {
      setUserRole(pathRole as 'admin' | 'student' | 'customer');
    } else {
      setUserRole(null);
    }
  }, [location.pathname]);

  // Fetch dashboard story
  const { story, loading, error } = useStoryblok(
    userRole ? `${userRole}-dashboard` : undefined,
    { version: STORYBLOK_VERSION }
  );

  // Fetch published articles dynamically
  useEffect(() => {
    console.log("Fetching published articles from Storyblok...");
    sb.get("cdn/stories", {
      starts_with: "articles", // folder
      version: STORYBLOK_VERSION,
      sort_by: "first_published_at:desc"
    })
    .then(res => {
      console.log("Raw articles response:", res);
      if (res.data && res.data.stories) {
        console.log("Articles fetched:", res.data.stories.map((a: any) => a.slug));
        setArticles(res.data.stories);
      } else {
        console.warn("No articles returned by Storyblok!");
        setArticles([]);
      }
    })
    .catch(err => console.error("Storyblok articles error:", err))
    .finally(() => setArticlesLoading(false));
  }, []);

  useEffect(() => {
    if (story) console.log('Dashboard story:', story);
    if (error) console.error('Storyblok dashboard error:', error);
  }, [story, error]);

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
        {stats.length > 0 ? (
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
        ) : (
          <p className="text-muted-foreground mb-8">No stats available.</p>
        )}

        {/* Quick Actions */}
        {actionButtons.length > 0 ? (
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {actionButtons.map((action: any, index: number) => {
                  const Icon = iconMap[action.icon as keyof typeof iconMap] || Plus;
                  return (
                    <Link
                      to={
                        action.label.toLowerCase() === "edit content"
                          ? "/content/articles"
                          : `/content/${action.link}`
                      }
                      key={index}
                    >
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
        ) : (
          <p className="text-muted-foreground mb-8">No quick actions available.</p>
        )}

        {/* Role-specific content */}
        {userRole === 'admin' && <UserManagementTableCard />}
        {userRole === 'student' && <StudentCards />}
        {userRole === 'customer' && <CustomerCards />}

        {/* Articles List */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>All Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <p>Loading articles...</p>
            ) : articles.length > 0 ? (
              <ul className="space-y-2">
                {articles.map(article => (
                  <li key={article.slug}>
                    <Link to={`/articles/${article.slug}`} className="text-primary hover:underline">
                      {article.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No articles found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Helper role-specific components (optional for cleaner code)
const UserManagementTableCard = () => (
  <Card className="shadow-card mb-8">
    <CardHeader>
      <CardTitle>User Management</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">Manage users, roles, and permissions in the system.</p>
      <UserManagementTable />
    </CardContent>
  </Card>
);

const StudentCards = () => (
  <>
    <Card className="shadow-card mb-8">
      <CardHeader>
        <CardTitle>My Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Access your assigned courses and learning materials.</p>
        <MyCourses />
      </CardContent>
    </Card>
    <Card className="shadow-card mb-8">
      <CardHeader>
        <CardTitle>My Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Track your favorite learning resources.</p>
        <MyBookmarks />
      </CardContent>
    </Card>
  </>
);

const CustomerCards = () => (
  <>
    <Card className="shadow-card mb-8">
      <CardHeader>
        <CardTitle>Recommended Content</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Get content tailored to your role and needs.</p>
        <RecommendedContent />
      </CardContent>
    </Card>
    <Card className="shadow-card mb-8">
      <CardHeader>
        <CardTitle>My Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Track your favorite learning resources.</p>
        <MyBookmarks />
      </CardContent>
    </Card>
  </>
);

export default Dashboard;