FROM node:18.20-alpine
WORKDIR /app
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]