import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for courses
const courses = [
  { slug: "introduction-to-react", title: "Introduction to React", category: "Web Development", progress: 75 },
  { slug: "advanced-css", title: "Advanced CSS & Animations", category: "Web Design", progress: 40 },
  { slug: "data-structures", title: "Data Structures in JS", category: "Computer Science", progress: 95 },
];

const MyCourses = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.slug} className="p-4 shadow-card flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{course.category}</p>
              <p className="font-semibold text-foreground">{course.title}</p>
              <Progress value={course.progress} className="w-full mt-2" />
            </div>
            <Button asChild variant="secondary" className="mt-4">
              <Link to={`/content/story/${course.slug}`}>
                {course.progress > 90 ? "Review" : "Continue"}
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;