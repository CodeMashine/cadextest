/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

import { Request, Response } from 'express';

const PORT = 7000;
const staticPath = path.resolve('build');

const app = express();

app.use(bodyParser.json());

type vector = number[];
type triangle = vector[];
type coords = triangle[];

const triangulation = (segments: number, radius: number, height: number): coords => {
  const coords: coords = [];
  for (let i = 0, s = segments; i < segments; i += 1) {
    const vector1: vector = [];
    const a1 = radius * Math.cos((Math.PI * 2 * i) / s);
    const b1 = radius * Math.sin((Math.PI * 2 * i) / s);
    const c1 = 0;
    vector1.push(a1, b1, c1);

    const vector2: vector = [];
    const a2 = radius * Math.cos((Math.PI * 2 * (i + 1)) / s);
    const b2 = radius * Math.sin((Math.PI * 2 * (i + 1)) / s);
    const c2 = 0;
    vector2.push(a2, b2, c2);

    const vector3: vector = [];
    const a3 = 0;
    const b3 = 0;
    const c3 = height;
    vector3.push(a3, b3, c3);

    const triangle = [vector1, vector2, vector3];

    coords.push(triangle);
  }
  return coords;
};

app.use(express.static(staticPath), (req: Request, res: Response) => {
  const { radius, height, segments } = req.body;
  const coords = triangulation(+segments, +radius, +height);
  res.send(JSON.stringify(coords));
});

app.listen(PORT, (): void => {
  console.log(`server is started at ${PORT}`);
});
