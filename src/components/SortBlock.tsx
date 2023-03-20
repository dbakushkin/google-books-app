import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

type SortProps = {
  category: string;
  sortMethod: string;
  handleCategoryChange: () => void;
  handleSortMethodChange: () => void;
};

const SortBlock: FC<SortProps> = ({
  category,
  sortMethod,
  handleCategoryChange,
  handleSortMethodChange,
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Категории</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Категории"
          onChange={handleCategoryChange}
        >
          <MenuItem selected={true} value={"all"}>
            All
          </MenuItem>
          <MenuItem value={"art"}>Art</MenuItem>
          <MenuItem value={"biography"}>Biography</MenuItem>
          <MenuItem value={"computers"}>Computers</MenuItem>
          <MenuItem value={"history"}>History</MenuItem>
          <MenuItem value={"medical"}>Medical</MenuItem>
          <MenuItem value={"poetry"}>Poetry</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortMethod}
          label="Сортировать по"
          onChange={handleSortMethodChange}
        >
          <MenuItem selected={true} value={"all"}>
            Relevance
          </MenuItem>
          <MenuItem value={"art"}>Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortBlock;
