FROM node:22-alpine as Dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine as Build
WORKDIR /app
COPY --from=Dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine as Prod
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=Build /app/dist ./dist
EXPOSE 3000
USER node
CMD ["node","dist/index.js"]
