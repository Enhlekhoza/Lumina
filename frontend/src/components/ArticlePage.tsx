import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";

// --- Algolia client ---
const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
);
const indexName = import.meta.env.VITE_ALGOLIA_INDEX;
const index = searchClient.initIndex(indexName);

interface Article {
  objectID: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
}

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await index.search<Article>(slug, { filters: `slug:"${slug}"` });
        if (res.hits.length === 0) {
          setError("Article not found.");
          setArticle(null);
        } else {
          setArticle(res.hits[0]);
        }
      } catch (err) {
        setError("Failed to fetch article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading article...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 text-lg mb-4">{error || "Article not found."}</p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">{article.excerpt}</p>
      <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: article.body }} />
      <div className="mt-8">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;