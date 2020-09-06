import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
} from "@material-ui/core";
import { ISeiya } from "./types";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const getCurrentDate = () => {
  const now = new Date();
  return `${now.getFullYear()}/${
    now.getMonth() + 1
  }/${now.getDate()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

export default ({ seiya }: { seiya: ISeiya }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {seiya.horoscope}
            </Avatar>
          }
          title={seiya.name}
          subheader={getCurrentDate()}
        />
        <CardMedia
          className={classes.media}
          image={`data:image/jpeg;base64,${seiya.image}`}
          title={seiya.name}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {seiya.description}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};
