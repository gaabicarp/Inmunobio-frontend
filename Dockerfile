FROM node:alpine as builder 
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . ./
RUN npm run build --prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/Inmunobio /usr/share/nginx/html
COPY appshell.sh appshell.sh
EXPOSE 80 
ENTRYPOINT ["sh", "/appshell.sh"]

