import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Loader2 } from "lucide-react";

interface SearchBarProps {
  userRole: "admin" | "student" | "customer";
  placeholder?: string;
  className?: string;
  onSearch: () => void;
  onResults: (results: any) => void;
}

const SearchBar = ({ userRole, placeholder = "Ask anything...", className = "", onSearch, onResults }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    onSearch();

    try {
      const response = await fetch("http://localhost:5001/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), role: userRole }),
      });

      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();

      setResults(data.results || []);
      setSummary(data.summary || null);
      onResults({ answer: data.summary, hits: data.results });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setResults([]);
      setSummary(null);
      onResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>

        {/* Input */}
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-32 h-14 text-base shadow-card border-border/50 focus:ring-primary focus:border-primary w-full"
          disabled={isLoading}
        />

        {/* Search Button */}
        <Button
          type="button"
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-primary hover:bg-primary-hover text-primary-foreground transition-smooth"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Search
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* AI Summary */}
      {summary && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-semibold mb-2">AI Summary:</h3>
          <p className="text-gray-800">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;