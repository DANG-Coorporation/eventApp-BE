FROM node:16.13.1-alpine 
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node","./src/app.js"]