# Utiliza a imagem oficial do Node.js versão 14 com Alpine Linux
FROM node:14-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências primeiro
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Define a porta que o container irá expor
EXPOSE 3000

# Define o comando que será executado ao iniciar o container
CMD ["npm", "run", "start:dev"]
