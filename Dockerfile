FROM centos as build-step

WORKDIR /app

RUN yum -y update
RUN yum -y install nodejs
RUN npm install --global yarn

COPY . ./

RUN npm install
RUN yarn build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html
