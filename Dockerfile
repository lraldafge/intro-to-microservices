FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:18-alpine as final
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 9000
CMD ["npm", "start"]