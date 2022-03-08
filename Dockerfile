ARG WORK_DIR=/app
FROM node:14.17 as builder

WORKDIR ${WORK_DIR}
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN cd client && npm install && npm run build --prod
# RUN npm install
# RUN npm run build --prod

# nginx state for serving content
FROM nginx:latest
COPY --from=builder ${WORK_DIR}/client/dist /usr/share/nginx/html
COPY --from=builder ${WORK_DIR}/nginx/nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80

CMD nginx -g "daemon off; "