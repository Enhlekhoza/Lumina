import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const paths = [
  {
    title: "Data Science Mastery",
    description: "From fundamentals to advanced machine learning.",
    steps: [
      { title: "Introduction to Python", completed: true, slug: "intro-to-python" },
      { title: "Data Analysis with Pandas", completed: true, slug: "pandas-for-analysis" },
      { title: "Data Visualization Principles", completed: false, slug: "data-visualization-principles" },
      { title: "Introduction to Machine Learning", completed: false, slug: "introduction-to-machine-learning" },
    ],
  },
  {
    title: "Full-Stack Web Developer",
    description: "Become a complete web developer.",
    steps: [
      { title: "HTML & CSS Foundations", completed: true, slug: "html-css-foundations" },
      { title: "JavaScript Essentials", completed: false, slug: "javascript-essentials" },
      { title: "React for Beginners", completed: false, slug: "react-for-beginners" },
      { title: "Node.js & Express", completed: false, slug: "nodejs-express-intro" },
    ],
  },
];

const LearningPathsPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Your Learning Paths</h1>
        <p className="text-muted-foreground text-lg">Follow these curated paths to achieve your goals.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {paths.map((path) => (
          <Card key={path.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {path.steps.map((step) => (
                  <li key={step.title} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${step.completed ? "bg-green-500" : "bg-muted"}`}>
                      {step.completed ? <Check className="w-4 h-4 text-white" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <Link to={`/content/${step.slug}`} className="flex-grow text-foreground hover:text-primary transition-colors">
                      {step.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full">
                Continue Path <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPathsPage;
