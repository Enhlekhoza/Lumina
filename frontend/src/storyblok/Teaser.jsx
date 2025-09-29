import React from "react";

const Teaser = ({ blok }) => {
  return (
    <div className="bg-primary/10 p-8 rounded-lg mb-6 shadow-card">
      <h2 className="text-3xl font-bold mb-2">{blok.headline}</h2>
      <p className="text-lg text-muted-foreground">{blok.text}</p>
    </div>
  );
};

export default Teaser;