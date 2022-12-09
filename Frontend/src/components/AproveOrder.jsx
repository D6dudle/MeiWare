import React, { useState } from "react";

export default function AproveOrder() {
  const [isAprovar, setAprovar] = useState(false); // Mostra as formações por aprovar

  return (
    <div className="flex items-center h-fit ml-4">
      <input
        id="aproved-checkbox"
        type="checkbox"
        value=""
        style={{ accentColor: "#ECC039" }}
        className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={() => setAprovar(!isAprovar)}
      />
      <label
        htmlFor="aproved-checkbox"
        className="ml-2 btnIcons dark:ring-offset-gray3"
      >
        {isAprovar ? "Aprovadas" : "Por aprovar"}
      </label>
    </div>
  );
}
