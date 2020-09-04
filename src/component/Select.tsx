import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { basePost } from "./api";
import { setting } from "../setting";

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

export default ({ updateItem }: { updateItem: any }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: "",
  });

  const handleChange = (event: any) => {
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("now", event.target.value);
    (async () => {
      const obj = await basePost({
        url: setting.url,
        params: { horoscope: event.target.value },
        headers: {},
      });
      console.log(obj);
      updateItem(obj);
    })();
  };
  return (
    <Fragment>
      星座を選択してください。
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">星座</InputLabel>
          <Select
            value={values.age}
            onChange={handleChange}
            inputProps={{
              name: "age",
              id: "age-simple",
            }}
          >
            <MenuItem value={"牡羊"}>牡羊座</MenuItem>
            <MenuItem value={"牡牛"}>牡牛座</MenuItem>
            <MenuItem value={"双子"}>双子座</MenuItem>
            <MenuItem value={"蟹"}>蟹座</MenuItem>
            <MenuItem value={"獅子"}>獅子座</MenuItem>
            <MenuItem value={"乙女"}>乙女座</MenuItem>
            <MenuItem value={"天秤"}>天秤座</MenuItem>
            <MenuItem value={"蠍"}>蠍座</MenuItem>
            <MenuItem value={"射手"}>射手座</MenuItem>
            <MenuItem value={"山羊"}>山羊座</MenuItem>
            <MenuItem value={"水瓶"}>水瓶座</MenuItem>
            <MenuItem value={"魚"}>魚座</MenuItem>
          </Select>
        </FormControl>
      </form>
    </Fragment>
  );
};
