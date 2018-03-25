FROM node:carbon
# root directory of project
  WORKDIR /usr/src/app

  COPY package*.json ./
  RUN npm install

# copy all code to docker-folder
  COPY . .
# build public folder
  RUN npm run build

# create folder for test-repository
  RUN mkdir repo
  
# clone test-repository from github  
  RUN git clone --mirror https://github.com/alex-knyazev/yandex-school-5-Node.js repo/.git

#system will provide this port to our docker-container
  EXPOSE 3000
  
#command we will use to run 
  CMD [ "npm", "start" ]
