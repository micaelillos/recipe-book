import jwt from 'jsonwebtoken';
import express = require('express');
export default function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // console.log(req.headers)
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    jwt.verify(token, process.env.TOKEN_SECRET ?? 'xyz');
    next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
}