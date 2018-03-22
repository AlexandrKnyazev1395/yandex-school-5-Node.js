FROM node:carbon
# root directory of project
  WORKDIR /usr/src/app

  COPY package*.json ./
  RUN npm install
# copy all code to docker-folder
  COPY . .
# buold public folder
  RUN npm run build
#system will provide this port to our docker-container
  EXPOSE 3000
#command we will use to run 
  CMD [ "npm", "start" ]
