# Imagen base node
FROM node:22.17-alpine 

# Instalar curl para health checks
RUN apk add --no-cache curl

# Directorio en el que se trabaja
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install
RUN npm install -g nodemon

# Copia los archivos de código
COPY . .

# Expone el puerto del servidor
EXPOSE 3000

# Comando para levantar el contenedor
CMD ["npm", "run", "dev"]