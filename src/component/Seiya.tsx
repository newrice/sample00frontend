import React, { useState, Fragment } from "react";
import Cards from "./Cards";
import Select from "./Select";

export default () => {
  const [obj, setObj] = useState<any>({});

  const updateItem = (obj: any) => {
    setObj({ obj });
  };
  const isEmpty = (obj: any) => {
    return !Object.keys(obj).length;
  };
  return (
    <Fragment>
      <Select updateItem={(obj: any) => updateItem(obj)} />
      {!isEmpty(obj) && <Cards obj={obj} />}
    </Fragment>
  );
};
