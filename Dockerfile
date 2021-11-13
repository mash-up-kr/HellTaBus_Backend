FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV PORT 3000
EXPOSE 3000
CMD ["npm", "run", "db:generate-migration && npm run db:migration"]
CMD ["npm", "run", "start:prod"]