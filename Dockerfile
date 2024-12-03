# Etapa de construcción
FROM node:16 as build-stage

WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el proyecto y construir la aplicación
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]