// const express = require("express");
import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();
import initRoute from "./service/initRoute";
import bodyParser from "body-parser";
import pool from "./configs/connectionDB";
import initApiRoute from "./service/initAPIRoute";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configViewEngine(app);

initRoute(app);

initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
