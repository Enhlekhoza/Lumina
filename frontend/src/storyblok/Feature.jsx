import React from "react";

const Feature = ({ blok }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-card">
      <h3 className="text-xl font-semibold mb-1">{blok.name}</h3>
      <p className="text-muted-foreground">{blok.description}</p>
    </div>
  );
};

export default Feature;