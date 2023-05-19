import { Select, Flex, Text } from "@chakra-ui/react";

const options = [6, 12, 18, 24, 30, 36, 42, 48];

const ResultsPerPageDropdown = ({ onChange, value }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <Flex alignItems="center" ml="auto">
      <Text mr={2}>Max Results:</Text>
      <Select value={value} onChange={handleChange} w="auto" mx={2}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default ResultsPerPageDropdown;