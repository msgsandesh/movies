import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.trim().toLowerCase()}`;

  const dropdown = () => {
    return (
      <label htmlFor="label">
        {label}
        <select
          name={label}
          id={id}
          value={state}
          onChange={e => setState(e.target.value)}
          onBlur={e => setState(e.target.value)}
          disabled={!options.length}
        >
          <option value="All">All</option>
          {options.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  };
  return [state, dropdown, setState];
};

export default useDropdown;
