import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface ISelect {
  handleSelectChange: (value: number) => void;
  currentId: number | undefined;
  selectList: {
    value: number;
    label: string;
  }[];
}

export default ({ handleSelectChange, currentId, selectList }: ISelect) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    handleSelectChange(Number(event.target.value));
  };
  return (
    <Fragment>
      星座を選択してください。
      <form className={classes.root} autoComplete='off'>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='seiya-select'>星座</InputLabel>
          <Select
            value={currentId || ""}
            onChange={handleChange}
            labelId='seiya-select'
          >
            {selectList.map((item) => (
              <MenuItem key={`seiya-select-${item.value}`} value={item.value}>
                {item.label || ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </Fragment>
  );
};
