import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, History, Bookmark, TrendingUp, Users, FileText } from "lucide-react";

// Map icon names from Storyblok to Lucide icons
const iconMap = {
  BookOpen,
  History,
  Bookmark,
  TrendingUp,
  Users,
  FileText,
};

const Stats = ({ blok }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {blok.stats &&
        blok.stats.map((stat) => {
          const Icon = iconMap[stat.icon] || FileText;
          return (
            <Card key={stat._uid} className="shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
                <Icon className="w-8 h-8 text-primary" />
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default Stats;