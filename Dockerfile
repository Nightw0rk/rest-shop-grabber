FROM node:5
COPY . /opt/app
WORKDIR /opt/app
RUN npm install --production
EXPOSE 1001
CMD node index.js