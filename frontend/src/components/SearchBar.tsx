import { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Loader2 } from "lucide-react";
import "instantsearch.css/themes/satellite.css";

interface SearchBarProps {
  userRole: "admin" | "student" | "customer";
  placeholder?: string;
  className?: string;
}

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
);
const indexName = import.meta.env.VITE_ALGOLIA_INDEX;

function Hit({ hit }: { hit: any }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <a href={`/articles/${hit.slug}`}>
        <h2
          className="font-bold text-lg"
          dangerouslySetInnerHTML={{ __html: hit._highlightResult.title.value }}
        />
      </a>
      <p
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: hit._highlightResult.excerpt.value }}
      />
    </div>
  );
}

const ResultsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { results } = useInstantSearch();
  if (!results || results.nbHits === 0) {
    return <p className="mt-4 text-gray-500">No results found.</p>;
  }
  return <>{children}</>;
};

const SearchBar = ({
  userRole,
  placeholder = "Ask anything...",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [topHitBody, setTopHitBody] = useState<string | null>(null);

  useEffect(() => {
    const summarizeTopHit = async () => {
      if (!topHitBody) return;
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5001/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: topHitBody, role: userRole }),
        });

        if (!response.ok) throw new Error("Failed to summarize with Gemini");
        const data = await response.json();
        setSummary(data.summary);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setSummary(null);
      } finally {
        setIsLoading(false);
      }
    };
    summarizeTopHit();
  }, [topHitBody, userRole]);

  const onHitsChange = (hits: any[]) => {
    if (hits.length > 0) setTopHitBody(hits[0].body || "");
    else {
      setTopHitBody(null);
      setSummary(null);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>

          {/* ✅ Custom Input */}
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-12 pr-32 h-14 text-base shadow-card border-border/50 focus:ring-primary focus:border-primary w-full"
            disabled={isLoading}
          />

          {/* ✅ Custom Button */}
          <Button
            type="button"
            onClick={() => topHitBody && setTopHitBody(topHitBody)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-primary hover:bg-primary-hover text-primary-foreground transition-smooth"
            disabled={!query.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Search
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <ResultsWrapper>
          <Hits
            hitComponent={Hit}
            transformItems={(items: any[]) => {
              onHitsChange(items);
              return items;
            }}
          />
        </ResultsWrapper>
      </InstantSearch>

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