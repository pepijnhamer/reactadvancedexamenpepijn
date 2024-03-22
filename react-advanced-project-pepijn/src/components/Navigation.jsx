import React from "react";
import { Link } from "react-router-dom";

// Topmenu with a link to the homepage
export const Navigation = () => {
  return (
    <div className="topmenu">
      <button>
        <Link to="/">All Events</Link>
      </button>
    </div>
  );
};
