import React, { useState, Fragment, useEffect } from "react";
import Cards from "./Cards";
import Select from "./Select";
import { ISeiya, IResponseSeiya, IRequestSeiya } from "./types";
import { baseGet, basePost, baseDelete } from "./api";
import { setting } from "../setting";
import { Button, TextField } from "@material-ui/core";
import { orientateImage, toBase64, toByteArray } from "./images";

const createSelectList = (list: ISeiya[]) => {
  const result: { value: number; label: string }[] = [];
  list.forEach((item) => {
    result.push({
      value: item.id,
      label: item.name,
    });
  });
  return result;
};

export default () => {
  const [seiya, setSeiya] = useState<ISeiya>();
  const [seiyaList, setSeiyaList] = useState<ISeiya[]>([]);

  // 登録
  const [insName, setInsName] = useState<string>("");
  const [insDesc, setInsDesc] = useState<string>("");
  const [insHoro, setInsHoro] = useState<string>("");
  const [insImg, setInsImg] = useState<number[]>([]);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  // 削除
  const [delId, setDelId] = useState<number | string>("");

  useEffect(() => {
    baseGet({
      url: setting.url,
    }).then((data: IResponseSeiya[]) => {
      setSeiyaList(data ? data : []);
    });
  }, []);

  const updateItem = (id: number) => {
    const seiya = seiyaList.find((item) => item.id === id);
    setSeiya(seiya);
  };

  return (
    <Fragment>
      <Select
        handleSelectChange={updateItem}
        currentId={seiya ? seiya.id : seiya}
        selectList={createSelectList(seiyaList)}
      />
      {seiya && <Cards seiya={seiya} />}
      <hr />
      <TextField
        type='text'
        label='名前'
        value={insName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInsName(event.target.value);
        }}
      />
      <TextField
        type='text'
        label='説明'
        value={insDesc}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInsDesc(event.target.value);
        }}
      />
      <TextField
        type='text'
        label='星座'
        value={insHoro}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInsHoro(event.target.value);
        }}
      />
      <input
        type='file'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target && event.target.files) {
            const a = event.target.files[0];
            setIsResizing(true);
            orientateImage(a).then(({ imageFile }) => {
              toBase64(imageFile).then((base64) => {
                // 状態の更新
                console.log(base64);
              });
              toByteArray(imageFile).then(
                ({ byteArray }: { byteArray: number[] }) => {
                  console.log(byteArray);
                  setInsImg(byteArray);
                  setIsResizing(false);
                }
              );
            });
          }
        }}
      />
      <Button
        disabled={isResizing || !insName}
        color='primary'
        variant='outlined'
        onClick={() => {
          basePost({
            url: setting.url,
            body: {
              name: insName,
              description: insDesc,
              horoscope: insHoro,
              image: insImg,
            } as IRequestSeiya,
          });
        }}
      >
        登録
      </Button>
      <hr />
      <Select
        handleSelectChange={setDelId}
        currentId={Number(delId)}
        selectList={createSelectList(seiyaList)}
      />
      <Button
        disabled={!delId}
        color='primary'
        variant='outlined'
        onClick={() => {
          baseDelete({
            url: setting.url,
            qparam: {
              id: delId.toString(),
            },
          });
        }}
      >
        削除
      </Button>
    </Fragment>
  );
};
