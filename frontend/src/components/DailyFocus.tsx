import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const DailyFocus = () => {
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote: "The journey of a thousand miles begins with a single step.",
      author: "Lao Tzu",
    },
    {
      quote: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
  ];

  const today = new Date().getDate();
  const quote = quotes[today % quotes.length];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
          Daily Focus
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic">"{quote.quote}"</p>
        <p className="text-right text-muted-foreground mt-2">- {quote.author}</p>
      </CardContent>
    </Card>
  );
};

export default DailyFocus;
