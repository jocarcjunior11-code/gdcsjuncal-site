# GitHub Desktop — caminho garantido (5 + 5 min)

> O GitHub Desktop é uma aplicação gratuita feita pelo próprio GitHub
> para resolver exatamente este problema. É visual, em português, e simples.

---

## PARTE 1 — Instalar (5 min)

### 1.1 Abre **https://desktop.github.com**

### 1.2 Clica em **"Download for Windows"** (botão grande roxo)

### 1.3 Quando o ficheiro `.exe` terminar de descarregar, **abre-o** (duplo clique)

### 1.4 A instalação é automática. Quando acabar, a app abre sozinha.

### 1.5 Quando a app abrir, clica em **"Sign in to GitHub.com"**

### 1.6 Vai abrir o browser a pedir-te para fazer login na tua conta GitHub
(usa a mesma conta `jocarcjunior11-code` que já criaste)

### 1.7 Autoriza a app e volta automaticamente ao GitHub Desktop

### 1.8 Quando perguntar **"Configure Git"**, clica em **"Use my GitHub account name and email address"** → **"Finish"**

✅ **Instalação completa.**

---

## PARTE 2 — Apagar o repositório atual e recomeçar limpo (2 min)

> Como o teu repositório atual está incompleto (sem as pastas),
> vamos apagar e começar do zero — é mais rápido e fica mais limpo.

### 2.1 Vai a **https://github.com/jocarcjunior11-code/gdcsjuncal-site/settings**

### 2.2 Desce até ao final da página, até à secção vermelha **"Danger Zone"**

### 2.3 Clica em **"Delete this repository"**

### 2.4 Vai aparecer uma confirmação. Escreve **`jocarcjunior11-code/gdcsjuncal-site`** na caixa e clica em **"I understand the consequences, delete this repository"**

✅ Apagado. Vamos recomeçar.

---

## PARTE 3 — Adicionar a pasta no GitHub Desktop (3 min)

### 3.1 Volta ao GitHub Desktop

### 3.2 Clica em **"File"** → **"Add local repository..."**

### 3.3 Clica em **"Choose..."** e navega até:
**`C:\Users\Utilizador\Documents\Claude\Projects\Site-Clube`**

Seleciona a pasta e clica em **"Select Folder"**

### 3.4 Provavelmente vai dizer: **"This directory does not appear to be a Git repository"**.
Clica no link **"create a repository"**.

### 3.5 Vai abrir um formulário. Preenche:

| Campo | O que pôr |
|---|---|
| **Name** | `gdcsjuncal-site` |
| **Description** | `Site oficial do Grupo Desportivo Centro Social do Juncal` |
| **Local path** | (já está correto, deixa como está) |
| **Initialize this repository with a README** | ❌ NÃO marques (já tens README) |
| **Git ignore** | `Node` |
| **License** | `None` |

### 3.6 Clica **"Create repository"**

---

## PARTE 4 — Publicar no GitHub (2 min)

### 4.1 No topo do GitHub Desktop vai aparecer um botão azul **"Publish repository"** — clica.

### 4.2 Vai aparecer uma janela. Preenche:
- **Name:** `gdcsjuncal-site`
- **Description:** `Site oficial do Grupo Desportivo Centro Social do Juncal`
- **Keep this code private:** ❌ **DESLIGA** esta opção (queremos público para o Vercel funcionar grátis)

### 4.3 Clica em **"Publish repository"**

### 4.4 Espera 30-90 segundos. O GitHub Desktop está a enviar todos os ficheiros e pastas.

✅ **Pronto.** Agora o repositório no GitHub tem TUDO — pastas + ficheiros + estrutura completa.

---

## Como verificar que está bem

1. Vai a **https://github.com/jocarcjunior11-code/gdcsjuncal-site**
2. Deves ver **TODAS estas pastas** na lista:
   - 📁 `app`
   - 📁 `components`
   - 📁 `lib`
   - 📁 `supabase`
3. As estatísticas de linguagens devem mostrar **TypeScript 50%+**

Quando confirmares, manda-me o URL outra vez e avançamos para a **FASE C — deploy no Vercel**. 🚀

---

## Bónus — porque é que vais adorar o GitHub Desktop

Daqui para a frente, sempre que mudares algo na pasta `Site-Clube`:
1. Abres o GitHub Desktop
2. Ele mostra-te o que mudou (a verde o que foi adicionado, a vermelho o que foi removido)
3. Escreves uma breve descrição (ex: "Atualizar logótipo")
4. Clicas **"Commit to main"** + **"Push origin"**
5. As mudanças vão automaticamente para o GitHub **e o Vercel atualiza o site sozinho**.

Sem terminal, sem comandos, sem stress.
