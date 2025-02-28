Claro! Aqui está o README atualizado, incluindo a parte sobre a estrutura da API dentro da pasta `/app`:

---

# Tabela Fipe

Este projeto é uma aplicação web construída com **Next.js 15**, **TypeScript** e **Node.js 20**. Ele permite consultar a Tabela Fipe de veículos, trazendo informações sobre marcas, modelos e preços de carros.

## Tecnologias Utilizadas

- **Next.js 15**: Framework React para aplicações web com renderização no lado do servidor (SSR) e geração de sites estáticos (SSG).
- **TypeScript**: Superset do JavaScript para adicionar tipagem estática.
- **Node.js 20**: Ambiente de execução JavaScript no servidor.
- **Emotion**: Biblioteca de estilização CSS-in-JS.
- **MUI**: Componentes de interface de usuário baseados em Material Design.
- **Redux Toolkit**: Para gerenciamento de estado de forma eficiente.

## Estrutura de Diretórios

```
tabela-fipe/
│
├── public/                  # Arquivos públicos estáticos
├── src/                     # Código fonte
│   ├── app/                 # Estrutura de rotas e layouts do Next.js
│   │   └── api/             # APIs internas do Next.js
│   │       ├── brands/      # Rota para listar marcas de veículos
│   │       ├── models/      # Rota para listar modelos por marca
│   │       ├── value/       # Rota para consultar valores por modelo e ano
│   │       └── years/       # Rota para listar anos de um modelo específico
│   ├── components/          # Componentes reutilizáveis
│   ├── constants/           # Constantes e valores fixos
│   ├── lib/                 # Funções utilitárias e helpers
│   ├── providers/           # Provedores de contexto para o app
│   ├── types/               # Tipos e interfaces TypeScript
│   ├── middleware.ts        # Middleware para funções customizadas
│
├── .env                     # Variáveis de ambiente
├── .nvmrc                   # Versão do Node.js
└── package.json             # Dependências e scripts do projeto
```

### APIs

Dentro da pasta `/src/app/api`, estão localizadas as rotas da API que fornecem os dados necessários para a consulta à Tabela Fipe. As principais rotas são:

- **`/api/brands`**: Retorna a lista de marcas de veículos disponíveis.
- **`/api/models/[brandId]`**: Retorna os modelos de veículos para uma marca específica.
- **`/api/value/[brandId]/[modelId]/[yearId]`**: Retorna o valor de um modelo de carro para um ano específico.
- **`/api/years/[brandId]/[modelId]`**: Retorna os anos disponíveis para um modelo de carro específico.

Essas rotas fazem requisições para a API externa da Tabela Fipe e retornam os dados de forma otimizada, aproveitando as funcionalidades do Next.js para gerar as respostas rapidamente.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/thiago-s-fernandes/teste-mobiauto.git
   cd tabela-fipe
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   API_FIPE_BASE_URL=https://parallelum.com.br/fipe/api/v1/carros/marcas
   SITE_BASE_URL=http://localhost:3000
   ```

4. Execute o projeto em ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

## Scripts

- **`npm run dev`**: Inicia o servidor de desenvolvimento com TurboPack.
- **`npm run build`**: Compila o projeto para produção.
- **`npm run start`**: Inicia o servidor de produção.
- **`npm run lint`**: Executa a verificação de linting no código.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).