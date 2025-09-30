import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Compass, FileClock, GraduationCap } from "lucide-react";

const QuickAction = ({ blok }) => {
  const actions = [
    {
      _uid: "explore-paths",
      link: "/learning-paths",
      title: "Explore Learning Paths",
      description: "Follow guided paths to master new skills.",
      icon: <Compass className="w-8 h-8 text-blue-500" />,
    },
    {
      _uid: "resume-course",
      link: "/my-courses",
      title: "Resume Your Last Course",
      description: "Jump back into 'Advanced Machine Learning'.",
      icon: <GraduationCap className="w-8 h-8 text-green-500" />,
    },
    {
      _uid: "saved-insights",
      link: "/my-bookmarks",
      title: "Review Saved Insights",
      description: "Revisit your 5 most recent bookmarks.",
      icon: <FileClock className="w-8 h-8 text-yellow-500" />,
    },
    {
      _uid: "ask-ai",
      link: "/ai-chat",
      title: "Ask Lumina AI",
      description: "Get instant answers and generate content summaries.",
      icon: <Bot className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {actions.map((action) => (
        <Link to={action.link} key={action._uid} className="group">
          <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
            <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold">{action.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-snug">{action.description}</p>
              </div>
              {action.icon}
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default QuickAction;
