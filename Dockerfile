FROM node:12-alpine AS build
WORKDIR /app
ADD . /app/
RUN npm install \
    && npm run build
RUN cp -r package.json dist/ \
    && cp package-lock.json dist/

FROM node:12-alpine AS web
WORKDIR /app
COPY --from=build /app/dist /app
RUN npm install --only=prod
EXPOSE 4000
CMD [ "node", "server.js" ]