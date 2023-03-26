import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";

type SortProps = {
  category: string;
  sortMethod: string;
  handleCategoryChange: (e: any) => void;
  handleSortMethodChange: (e: any) => void;
};

const SortBlock: FC<SortProps> = ({
  category,
  sortMethod,
  handleCategoryChange,
  handleSortMethodChange,
}) => {
  return (
    <div>
      <FormControl sx={{ mt: 2 }} fullWidth>
        <InputLabel id="demo-simple-select-label">
          Выберите категорию
        </InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Категории"
          onChange={handleCategoryChange}
        >
          <MenuItem value={" "}>All</MenuItem>
          <MenuItem value={"art"}>Art</MenuItem>
          <MenuItem value={"biography"}>Biography</MenuItem>
          <MenuItem value={"computers"}>Computers</MenuItem>
          <MenuItem value={"history"}>History</MenuItem>
          <MenuItem value={"medical"}>Medical</MenuItem>
          <MenuItem value={"poetry"}>Poetry</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mt: 2 }} fullWidth>
        <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortMethod}
          label="Сортировать по"
          onChange={handleSortMethodChange}
        >
          <MenuItem value={"relevance"}>Relevance</MenuItem>
          <MenuItem value={"newest"}>Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortBlock;
