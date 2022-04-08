ARG WORK_DIR=/app
FROM micael11/node-nginx:latest
WORKDIR ${WORK_DIR}
COPY . . 
# RUN npm run build --prod
# Copy client static files (must be built before)
COPY ${WORK_DIR}/client/dist /usr/share/nginx/html
# Backend
RUN cd backend && yarn && yarn tsc 
# Copy nginx conf 
COPY  ${WORK_DIR}/nginx/nginx.conf /etc/nginx/conf.d/default.conf 
# Expose ports
EXPOSE 80
EXPOSE 3000
# Run node server and nginx dameon
CMD ["sh", "-c", "node ./backend/build/index.js  & nginx -g 'daemon off;' "]