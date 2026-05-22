# Site do Grupo Desportivo Centro Social do Juncal

Plataforma digital institucional do clube — ténis de mesa, ginásio e comunicação,
tudo num só sítio.

---

## O que este site faz

- **Mostra ao público** as equipas, competições, jogos, resultados, fotos e notícias do clube.
- **Vende** as duas modalidades principais: secção de ténis de mesa e ginásio.
- **Recebe inscrições** online (formulário no site).
- **Permite à direção** atualizar tudo sem ajuda técnica, a partir de um painel próprio.

O site é construído com tecnologia moderna (Next.js + Supabase) mas para usar não precisas
saber nada de programação — só de seguir as instruções abaixo.

---

## Como ver o site no teu computador

Precisas de instalar duas coisas (apenas da primeira vez):

1. **Node.js** — descarrega em https://nodejs.org/ (versão LTS, à direita).
2. **Um editor de texto** — sugiro Visual Studio Code (https://code.visualstudio.com/) — opcional.

Depois, abre o **Terminal** (Windows: PowerShell · Mac: Terminal) na pasta do projeto e escreve:

```
npm install
npm run dev
```

O site fica disponível em **http://localhost:3000** no teu navegador.

> Na primeira execução o site funciona com **dados de exemplo**.
> Para gerir conteúdo real, segue o passo seguinte.

---

## Como ligar a base de dados real (Supabase)

A **base de dados** é o sítio onde ficam guardados os jogos, resultados, notícias, etc.
Usamos o **Supabase** — é gratuito até a quantidades grandes.

### Passo 1 — Criar conta
1. Vai a https://supabase.com → "Start your project" → cria conta com email ou GitHub.
2. Cria um novo projeto: nome `gd-juncal`, região "West EU (Paris)" ou similar.
3. Anota a palavra-passe que escolheres.

### Passo 2 — Criar as tabelas
1. No painel do Supabase, no menu da esquerda, escolhe **SQL Editor**.
2. Abre o ficheiro `supabase/schema.sql` deste projeto, copia tudo, cola no SQL Editor e clica **Run**.
3. Repete o mesmo para `supabase/seed.sql` (dados de exemplo iniciais).

### Passo 3 — Configurar as chaves no site
1. No Supabase, vai a **Settings → API**.
2. Copia os valores:
   - **Project URL**
   - **anon public key**
   - **service_role key**
3. No projeto, cria um ficheiro chamado `.env.local` (igual ao `.env.example`) e cola os valores.
4. Volta ao Terminal e reinicia: `npm run dev`.

### Passo 4 — Criar a tua conta de admin
1. No Supabase, vai a **Authentication → Users → Add user**.
2. Coloca o teu email e uma palavra-passe forte.
3. Marca **"Auto Confirm User"** (para entrar logo sem confirmação por email).
4. Pronto. Vai a http://localhost:3000/admin/login e entra com esses dados.

### Passo 5 (opcional) — Upload de fotos
Se queres carregar fotos e vídeos diretamente do admin:
1. No Supabase, vai a **Storage** → **New bucket** → nome `media` → marca como **public**.
2. Já podes usar a opção "Carregar ficheiro" em **/admin/media/nova**.

---

## Como usar o painel de administração

Entra em **/admin/login** com a conta que criaste.

### Adicionar um jogo
1. Menu lateral → **Jogos** → **Novo jogo**.
2. Preenche competição, equipas, data e local.
3. Estado começa em "Agendado" — depois do jogo mudas para "Terminado".

### Inserir resultado de um jogo
1. Abre o jogo no painel admin.
2. Separador **"Resultado final"** → escreves 4-2 (ou o que for) → **Guardar**.
3. O jogo passa automaticamente para "Terminado" e aparece nos resultados no site.

### Inserir encontros individuais (sets)
1. No mesmo jogo, separador **"Encontros individuais"**.
2. Clica **"Adicionar encontro"** para cada par de jogadores.
3. Em cada encontro, clica **"Adicionar set"** e escreves os pontos (11-8, etc.).
4. O total de sets ganhos é calculado automaticamente.
5. **Guardar encontros**.

### Escrever uma notícia
1. Menu lateral → **Notícias** → **Nova notícia**.
2. Preenche título, conteúdo, categoria.
3. Se quiseres uma imagem de capa, copia o URL de uma foto (do Supabase Storage ou de qualquer site).
4. Marca **"Destaque"** se quiseres que apareça em grande na homepage.

### Carregar fotos e vídeos
1. Menu lateral → **Media** → **Carregar nova**.
2. Escolhes "Carregar ficheiro" (do teu computador) ou "Colar URL" (ex: vídeo do YouTube).
3. Podes associar a um jogo específico para aparecer na galeria desse jogo.

### Ver inscrições recebidas
1. Menu lateral → **Inscrições**.
2. Vês todas as pessoas que se inscreveram pelo site (ginásio e ténis de mesa).
3. Marca como "Contactado" quando entrares em contacto com a pessoa.

---

## Como pôr o site online (deploy)

A forma mais simples (e gratuita) é com **Vercel**:

1. Cria conta em https://vercel.com (com a mesma conta GitHub onde tens o projeto).
2. Importa o projeto.
3. Em **Environment Variables**, cola as 3 variáveis do Supabase (vê `.env.example`).
4. Clica **Deploy**.
5. Em ~2 minutos o site fica disponível num URL público (podes ligar o teu próprio domínio depois).

---

## Mudar nome, cores ou contactos do clube

**Um único ficheiro** controla a identidade do clube: `lib/club-config.ts`.

Abre esse ficheiro e muda o que precisares:
- Nome do clube
- Email, telefone, morada
- Ano de fundação
- Horários e preços do ginásio

Para mudar **cores**, abre `tailwind.config.ts` e altera os valores em `club.primary`, `club.accent`, etc.

---

## Estrutura de pastas (referência)

```
Site-Clube/
├── app/                  Páginas do site
│   ├── page.tsx          Homepage
│   ├── competicoes/      Páginas de competições
│   ├── jogos/            Páginas de jogos
│   ├── equipas/          Páginas de equipas
│   ├── noticias/         Notícias
│   ├── media/            Galeria
│   ├── ginasio/          Página do ginásio
│   ├── inscricoes/       Formulários de inscrição
│   └── admin/            Painel da direção
├── components/           Peças reutilizáveis (Header, Footer, Cards…)
├── lib/                  Lógica e dados
│   ├── club-config.ts    ⭐ Identidade do clube (muda aqui!)
│   ├── data.ts           Como o site lê dados (Supabase ou demo)
│   ├── demo-data.ts      Dados de exemplo para o site ter conteúdo
│   └── supabase.ts       Ligação ao Supabase
├── supabase/
│   ├── schema.sql        Estrutura da base de dados
│   └── seed.sql          Dados iniciais
└── .env.example          Modelo do ficheiro de configuração
```

---

## Suporte

Se algo não funcionar, manda email para [geral@gdjuncal.pt](mailto:geral@gdjuncal.pt)
ou volta ao Claude e diz o que aconteceu — ele explica passo a passo.

---

**Tradição, mérito e comunidade.** 🏓
