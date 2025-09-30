import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight
} from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/satellite.css"; // optional theme

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
);

function Hit({ hit }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <a href={`/articles/${hit.slug}`}>
        <h2 className="font-bold text-lg">
          <Highlight attribute="title" hit={hit} />
        </h2>
      </a>
      <p className="text-gray-600">
        <Highlight attribute="excerpt" hit={hit} />
      </p>
    </div>
  );
}

export default function AlgoliaSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName={import.meta.env.VITE_ALGOLIA_INDEX}>
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}