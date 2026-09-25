FROM node:22-alpine as Dependencies
WORKDIR /app
COPY package*.json ./
# Install all dependencies
RUN npm ci

FROM node:22-alpine as Build
WORKDIR /app
COPY --from=Dependencies /app/node_modules ./node_modules
COPY . .
# this will convert src/index.ts to dist/index.js. the dist folder will be visible in container
RUN npm run build

FROM node:22-alpine as Prod
WORKDIR /app
COPY package*.json ./
# install dependencies except dev env
RUN npm ci --omit=dev
COPY --from=Build /app/dist ./dist
EXPOSE 3000
USER node
# We can Start application using CMD ["npm", "start"] also
CMD ["node","dist/index.js"]
