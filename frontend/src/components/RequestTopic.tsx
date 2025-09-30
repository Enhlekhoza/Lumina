import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const RequestTopic = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a New Topic</CardTitle>
        <CardDescription>
          Have an idea for a new course or article? Let us know! We value your input.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="topic-title">Topic Title</Label>
            <Input id="topic-title" placeholder="e.g., 'Quantum Computing Explained'" />
          </div>
          <div>
            <Label htmlFor="topic-description">Why is this important?</Label>
            <Textarea
              id="topic-description"
              placeholder="Describe what you'd like to learn and why it would be valuable."
            />
          </div>
          <div className="flex justify-end">
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestTopic;
