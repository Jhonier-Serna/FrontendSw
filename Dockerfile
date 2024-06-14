# Utiliza una imagen de Node.js más reciente como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila la aplicación Angular
RUN npm run build --prod

# Usa una imagen de Nginx para servir la aplicación Angular
FROM nginx:alpine

# Copia los archivos compilados al directorio de Nginx
COPY --from=0 /app/dist/frontendsw /usr/share/nginx/html

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 4200

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
