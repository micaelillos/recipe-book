ARG WORK_DIR=/app
FROM node:14.17 as builder

WORKDIR ${WORK_DIR}
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
# RUN npm install
# RUN npm run build --prod
# nginx state for serving content
ARG WORK_DIR=/app
FROM micael11/node-nginx:latest
ENV NODE_OPTIONS=”–max_old_space_size=2048″
WORKDIR ${WORK_DIR}
COPY --from=builder ${WORK_DIR}/backend ${WORK_DIR}/backend
COPY --from=builder ${WORK_DIR}/client ${WORK_DIR}/client
# Backend
RUN cd backend && yarn && yarn tsc 
# Client
RUN cd client && yarn && yarn run build --prod
RUN mv client/dist /usr/share/nginx/html
# Copy static files
COPY --from=builder ${WORK_DIR}/nginx/nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
EXPOSE 3000
CMD ["sh", "-c", "node ./backend/build/index.js  & nginx -g 'daemon off;' "]