FROM node:alpine as builder 
WORKDIR /app
COPY package.json package-lock.json  ./
RUN npm install && mv ./node_modules ./
COPY . ./
RUN npm run build 

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/Inmunobio /usr/share/nginx/html
EXPOSE 80 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
