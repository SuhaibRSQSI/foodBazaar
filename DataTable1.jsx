import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";

export default function DataTable({ data, columns }) {
  const [filters, setFilters] = useState({});
  const [searchQueries, setSearchQueries] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleFilterChange = (key, value, checked) => {
    setFilters((prev) => {
      const selectedValues = prev[key] || [];
      return {
        ...prev,
        [key]: checked
          ? [...selectedValues, value]
          : selectedValues.filter((v) => v !== value),
      };
    });
  };

  const handleSearchChange = (key, query) => {
    setSearchQueries((prev) => ({
      ...prev,
      [key]: query.toLowerCase(),
    }));
  };

  const filterPanelContent = (key, uniqueValues) => {
    const searchQuery = searchQueries[key] || "";
    const filteredValues = uniqueValues
      .filter((value) => String(value).toLowerCase().includes(searchQuery))
      .sort((a, b) => {
        const query = searchQuery.toLowerCase();
        const aMatches = String(a).toLowerCase().includes(query);
        const bMatches = String(b).toLowerCase().includes(query);

        if (aMatches && !bMatches) return -1; // a comes first
        if (!aMatches && bMatches) return 1; // b comes first
        return String(a).localeCompare(String(b)); // Alphabetical sort
      });

    // Check if no results match
    const noResults = filteredValues.length === 0;

    return (
      <>
        <input
          type="text"
          placeholder={`Search ${key}`}
          value={searchQuery}
          onChange={(e) => handleSearchChange(key, e.target.value)}
          style={{ marginBottom: "0.5rem" }}
        />
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {noResults ? (
            <p style={{ padding: "10px", color: "gray" }}>
              No options available
            </p>
          ) : (
            <List
              height={200} // Adjust based on the dropdown height
              itemCount={filteredValues.length}
              itemSize={30} // Height of each filter item
              width="100%"
            >
              {({ index, style }) => {
                const value = filteredValues[index];
                return (
                  <div key={value} style={style}>
                    <label>
                      <input
                        type="checkbox"
                        value={value}
                        checked={filters[key]?.includes(value) || false}
                        onChange={(e) =>
                          handleFilterChange(key, value, e.target.checked)
                        }
                      />
                      {value}
                    </label>
                  </div>
                );
              }}
            </List>
          )}
        </div>
      </>
    );
  };

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, selectedValues]) =>
      selectedValues.length === 0 ? true : selectedValues.includes(row[key])
    )
  );

  return (
    <div>
      <button
        onClick={() => setShowFilterPanel((prev) => !prev)}
        style={{ marginBottom: "1rem" }}
      >
        Toggle Filters
      </button>

      {showFilterPanel && (
        <div className="filter-panel" style={{ marginBottom: "1rem" }}>
          {columns.map(({ label, key }) => {
            const uniqueValues = [...new Set(data.map((item) => item[key]))];

            return (
              <div key={key} className="filter-section">
                <details>
                  <summary>{label}</summary>
                  {filterPanelContent(key, uniqueValues)}
                </details>
              </div>
            );
          })}
        </div>
      )}

      <table>
        <thead>
          <tr>
            {columns.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((row, index) => (
              <tr key={index}>
                {columns.map(({ key }) => (
                  <td key={key}>{row[key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
