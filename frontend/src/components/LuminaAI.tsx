import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, TrendingUp } from "lucide-react";

const LuminaAI = ({ userRole }: { userRole: "admin" | "student" | "customer" }) => {
  const tips = {
    admin: "Try using the 'User Management' table to sort users by their last login date.",
    student: "Did you know you can bookmark articles to read later? Look for the bookmark icon.",
    customer: "Use the search bar to find content tailored to your needs.",
  };

  const briefings = {
    admin: [
      { slug: "user-segmentation-strategies", title: "User Segmentation Strategies" },
      { slug: "data-driven-decision-making", title: "Data-Driven Decision Making" },
      { slug: "optimizing-user-onboarding", title: "Optimizing User Onboarding" },
    ],
    student: [
      { slug: "effective-note-taking", title: "Effective Note-Taking" },
      { slug: "time-management-for-students", title: "Time Management for Students" },
      { slug: "how-to-prepare-for-exams", title: "How to Prepare for Exams" },
    ],
    customer: [
      { slug: "understanding-analytics", title: "Understanding Your Analytics" },
      { slug: "customer-retention-techniques", title: "Customer Retention Techniques" },
      { slug: "getting-the-most-out-of-lumina", title: "Getting the Most Out of Lumina" },
    ],
  };

  const tip = tips[userRole];
  const briefing = briefings[userRole];

  return (
    <Card className="mb-8 bg-gradient-to-br from-primary/10 to-background shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Sparkles className="w-6 h-6 mr-2 text-primary" />
          Your AI-Powered Briefing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Coach */}
        <div className="flex items-start space-x-4">
          <Zap className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="font-semibold">AI Coach Tip of the Day</h3>
            <p className="text-muted-foreground">{tip}</p>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="font-semibold">Learning Streak</h3>
            <p className="text-muted-foreground">You're on a 5-day learning streak! Keep it up.</p>
          </div>
        </div>

        {/* Personalized Briefing */}
        <div>
          <h3 className="font-semibold mb-2">Recommended for You Today</h3>
          <ul className="space-y-2">
            {briefing.map((item) => (
              <li key={item.slug} className="flex items-center">
                <a href={`/content/${item.slug}`} className="text-primary hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LuminaAI;
