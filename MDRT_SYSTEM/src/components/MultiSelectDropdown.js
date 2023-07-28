import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MultiSelectDropdown = ({ options, value, onChange, loading, error, labelledBy, hasSelectAll }) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    onChange(selectedOptions);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={handleChange}
      labelledBy={labelledBy}
      hasSelectAll={hasSelectAll}
    />
  );
};

export default MultiSelectDropdown;