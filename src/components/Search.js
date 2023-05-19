import { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Input } from "@chakra-ui/react";
import useUpdateLogger from "../hooks/use-update-logger";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";

const Search = ({ onSearchBarChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchBarChange = useMemo(
    () => debounce(onSearchBarChange, 1000),
    [onSearchBarChange]
  );
  const location = useLocation();
  useUpdateLogger(searchTerm, "Search Term");

  const onInputChange = useCallback(
    (searchParam) => {
      setSearchTerm(searchParam);
      debouncedSearchBarChange(searchParam);
      localStorage.setItem("searchValue", searchParam);
    },
    [debouncedSearchBarChange]
  );

  // Restore search value from local storage when route changes
  useEffect(() => {
    const savedSearchValue = localStorage.getItem("searchValue");
    if (savedSearchValue !== null) {
      setSearchTerm(savedSearchValue);
      onInputChange(savedSearchValue);
    }
  }, [location, onInputChange]);

  return (
    <Box spacing={3} mt={6}>
      <Input
        variant="filled"
        placeholder="Search for a GIF"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      />
    </Box>
  );
};

export default Search;
