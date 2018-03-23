FROM node:carbon
# root directory of project
  WORKDIR /usr/src/app

  COPY package*.json ./
  RUN npm install
# copy all code to docker-folder
  COPY . .
# build public folder
  RUN npm run build

  RUN git clone --mirror https://github.com/alex-knyazev/my-git-test-repo repo/.git
#system will provide this port to our docker-container
  EXPOSE 3000
#command we will use to run 
  CMD [ "npm", "start" ]
