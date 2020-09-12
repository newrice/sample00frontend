import React, { useState, Fragment, useEffect } from "react";
import Cards from "./Cards";
import Select from "./Select";
import { ISeiya, IResponseSeiya, IRequestSeiya } from "./types";
import { baseGet, basePost, baseDelete, basePut } from "./api";
import { setting } from "../setting";
import { Button, TextField, Grid } from "@material-ui/core";
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 登録
  const [insName, setInsName] = useState<string>("");
  const [insDesc, setInsDesc] = useState<string>("");
  const [insHoro, setInsHoro] = useState<string>("");
  const [insImg, setInsImg] = useState<number[]>([]);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isResizing, setIsResizing] = useState<boolean>(false);

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

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
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
      <Button variant='contained' onClick={handleClickOpen} size='small'>
        管理
      </Button>
      {isOpen && (
        <Grid container direction='column' alignItems='center'>
          <Grid item>
            <TextField
              type='text'
              label='名前'
              value={insName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInsName(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              type='text'
              label='説明'
              value={insDesc}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInsDesc(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              type='text'
              label='星座'
              value={insHoro}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInsHoro(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <input
              type='file'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target && event.target.files) {
                  const a = event.target.files[0];
                  setIsResizing(true);
                  orientateImage(a).then(({ imageFile }) => {
                    toBase64(imageFile).then((base64) => {
                      // 状態の更新
                      setImgSrc(base64);
                    });
                    toByteArray(imageFile).then(
                      ({ byteArray }: { byteArray: number[] }) => {
                        setInsImg(byteArray);
                        setIsResizing(false);
                      }
                    );
                  });
                }
              }}
            />
          </Grid>
          <Grid item>{imgSrc && <img alt='update' src={imgSrc} />}</Grid>
          <Grid item>
            <Button
              disabled={isResizing || !insName}
              color='primary'
              variant='contained'
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
            <Button
              disabled={!seiya || !seiya.id || isResizing}
              color='primary'
              variant='outlined'
              onClick={() => {
                basePut({
                  url: setting.url,
                  qparam: {
                    id: seiya && seiya.id ? seiya.id.toString() : "",
                  },
                  body: {
                    name: insName || seiya?.name,
                    description: insDesc || seiya?.description,
                    horoscope: insHoro || seiya?.horoscope,
                    image: insImg.length ? insImg : seiya?.image,
                  } as IRequestSeiya,
                });
              }}
            >
              更新
            </Button>
            <Button
              disabled={!seiya || !seiya.id}
              color='secondary'
              variant='text'
              onClick={() => {
                baseDelete({
                  url: setting.url,
                  qparam: {
                    id: seiya && seiya.id ? seiya.id.toString() : "",
                  },
                });
              }}
            >
              削除
            </Button>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};
