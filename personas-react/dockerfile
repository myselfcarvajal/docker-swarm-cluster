# Etapa 1: Construcción
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación para producción
RUN npm run build   

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos de la build desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx está sirviendo la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
