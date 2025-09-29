import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const QuickAction = ({ blok }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {blok.actions &&
        blok.actions.map((action) => (
          <Link to={action.link} key={action._uid}>
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent transition-smooth"
            >
              <Plus className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default QuickAction;