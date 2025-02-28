# Exercises

Este repositório contém uma série de exercícios escritos em TypeScript dentro da pasta `src/`.

## Estrutura do Projeto

```
exercises/
├── src/
│   ├── exercise-1.ts
│   ├── exercise-2.ts
│   ├── exercise-3.ts
│   ├── exercise-4.ts
├── package.json
├── tsconfig.json (se aplicável)
└── README.md
```

## Requisitos

Para executar este projeto, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/exercises.git
   cd exercises
   ```

2. Instale as dependências (caso existam no futuro):

   ```sh
   npm install
   ```

## Compilando o Projeto

Para compilar os arquivos TypeScript, execute o comando:

```sh
npm run build
```

Isso irá gerar os arquivos JavaScript correspondentes na pasta de saída configurada no `tsconfig.json` (caso exista).

## Executando os Exercícios

Você pode executar cada arquivo individualmente utilizando `ts-node` (caso esteja instalado) ou compilando e rodando com Node.js.

Com `ts-node`:

```sh
npx ts-node src/exercise-1.ts
```

Compilando e rodando com Node.js:

```sh
npm run build
node dist/exercise-1.js
```
