import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LearningProgress = () => {
  const goals = [
    { title: "Complete 5 articles this week", progress: 60 },
    { title: "Take a new course", progress: 20 },
    { title: "Share your learnings", progress: 80 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="w-5 h-5 mr-2 text-green-500" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {goals.map((goal, index) => (
            <li key={index}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{goal.title}</p>
                <p className="text-sm text-muted-foreground">{goal.progress}%</p>
              </div>
              <Progress value={goal.progress} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
