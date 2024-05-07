# Imagem oficial do Node.js como imagem base
FROM node:14-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de pacote e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
