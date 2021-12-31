FROM node:14.17.0

WORKDIR /workspace


COPY package.json /workspace/

RUN npm i -g @nestjs/cli

RUN yarn 

COPY . .

EXPOSE 80

CMD ["yarn", "run", "start:dev"]
