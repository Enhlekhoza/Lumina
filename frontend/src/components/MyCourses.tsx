import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const courses = [
  {
    title: "Introduction to Data Science",
    description: "Learn the fundamentals of data analysis and visualization.",
    progress: 75,
    status: "In Progress",
  },
  {
    title: "Advanced Machine Learning",
    description: "Explore complex algorithms and neural networks.",
    progress: 30,
    status: "In Progress",
  },
  {
    title: "Web Development Bootcamp",
    description: "Master front-end and back-end development.",
    progress: 100,
    status: "Completed",
  },
];

const MyCourses = () => {
  return (
    <div className="space-y-6">
      {courses.map((course, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">{course.status}</p>
              <p className="text-sm text-muted-foreground">{course.progress}%</p>
            </div>
            <Progress value={course.progress} className="mb-4" />
            <Button disabled={course.status === 'Completed'}>
              <PlayCircle className="w-4 h-4 mr-2" />
              {course.status === 'Completed' ? 'Course Completed' : 'Continue Course'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyCourses;
