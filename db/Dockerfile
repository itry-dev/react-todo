FROM node:16-alpine
RUN npm install -g json-server
WORKDIR /data
RUN touch db.json && echo '{ "todos": [] }' >> db.json
RUN echo 'db.json file created successfully'