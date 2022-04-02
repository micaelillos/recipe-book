#!/bin/bash
node ./backend/build/index.js  &
nginx -g "daemon off; " 