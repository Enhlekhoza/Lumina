// src/pages/QuickActionPage.tsx
import { useLocation, Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type MockContent = {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
};

const mockContent: Record<string, MockContent> = {
  // Admin Dashboard Quick Actions
  "manage-users": {
    title: "Manage Users",
    subtitle: "Admins can oversee all users",
    description:
      "View all users, edit roles, deactivate accounts, and assign permissions. Ensure your platform is secure and organized.",
    image: "/mock-images/admin-manage-users.jpg",
  },
  "view-reports": {
    title: "Analytics & Reports",
    subtitle: "Track system usage and engagement",
    description:
      "Access detailed dashboards showing platform activity, course completions, and user engagement metrics. Make data-driven decisions.",
    image: "/mock-images/admin-reports.jpg",
  },
  "site-settings": {
    title: "Site Settings",
    subtitle: "Customize your platform",
    description:
      "Update platform settings, themes, and general preferences. Control how your users experience the dashboard.",
    image: "/mock-images/admin-settings.jpg",
  },

  // Student Dashboard Quick Actions
  "my-courses": {
    title: "My Courses",
    subtitle: "Track your learning progress",
    description:
      "View all your enrolled courses, track completion, and pick up right where you left off. Learning made easy and organized.",
    image: "/mock-images/student-courses.jpg",
  },
  "bookmarks": {
    title: "My Bookmarks",
    subtitle: "Save important resources",
    description:
      "Keep your favorite articles, lessons, and resources all in one place for easy access whenever you need them.",
    image: "/mock-images/student-bookmarks.jpg",
  },
  "course-feedback": {
    title: "Course Feedback",
    subtitle: "Share your opinions",
    description:
      "Submit feedback for your courses to help instructors improve content and tailor lessons to your learning needs.",
    image: "/mock-images/student-feedback.jpg",
  },

  // Customer Dashboard Quick Actions
  "recommended-content": {
    title: "Recommended Content",
    subtitle: "Tailored just for you",
    description:
      "Explore articles, tutorials, and resources curated for your role. Stay up to date with the most relevant content.",
    image: "/mock-images/customer-recommended.jpg",
  },
  "saved-resources": {
    title: "Saved Resources",
    subtitle: "All your bookmarks in one place",
    description:
      "Quickly access content you’ve saved for later. Organize your learning or reference materials efficiently.",
    image: "/mock-images/customer-saved.jpg",
  },
  "contact-support": {
    title: "Contact Support",
    subtitle: "We are here to help",
    description:
      "Have questions or need assistance? Reach out to our support team directly from this page for fast and reliable help.",
    image: "/mock-images/customer-support.jpg",
  },

  // Default fallback
  "default": {
    title: "Coming Soon",
    subtitle: "This Quick Action page will be available soon",
    description:
      "We are working on creating unique content for this action. Stay tuned for more amazing features.",
    image: "/mock-images/default.jpg",
  },
};

const QuickActionPage = () => {
  const { actionId } = useParams<{ actionId: string }>();
  const location = useLocation();

  const content = actionId && mockContent[actionId] ? mockContent[actionId] : mockContent["default"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent flex flex-col items-center py-10 px-4">
      <Card className="max-w-3xl w-full shadow-lg rounded-2xl overflow-hidden">
        {content.image && (
          <img src={content.image} alt={content.title} className="w-full h-64 object-cover" />
        )}
        <CardHeader className="bg-card/70 backdrop-blur-sm">
          <CardTitle className="text-3xl font-bold">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg mb-4">{content.subtitle}</p>
          <p className="text-foreground text-base leading-relaxed">{content.description}</p>
          <div className="mt-6 flex justify-start">
            <Link to={`/${location.state?.fromDashboard || "dashboard"}`}>
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionPage;