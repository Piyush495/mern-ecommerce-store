FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 3000
CMD ["node","src/server.js"]

