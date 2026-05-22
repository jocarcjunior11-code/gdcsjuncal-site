# Guia rápido — Primeiros Passos

> Lê isto **primeiro** se nunca trabalhaste com um site Next.js.
> É um caminho de 15 minutos do "abri agora" até "estou a ver o meu site no browser".

## 1. Tens o Node.js instalado?

Abre o Terminal (Windows: PowerShell · Mac: Terminal) e escreve:

```
node -v
```

Se aparecer algo como `v20.x` ou `v22.x`, está bem. Senão, instala em https://nodejs.org/ (versão LTS).

## 2. Entra na pasta do projeto

No Terminal:

```
cd "C:\Users\Utilizador\Documents\Claude\Projects\Site-Clube"
```

(no Mac/Linux usa `cd ~/Documents/Claude/Projects/Site-Clube` ou parecido)

## 3. Instala as peças do site (só da primeira vez)

```
npm install
```

Demora 1–3 minutos. É normal aparecerem muitas linhas e algumas amarelas.

## 4. Arranca o site

```
npm run dev
```

Vai aparecer algo como:

```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
✓ Ready in 1.5s
```

Abre o browser em **http://localhost:3000** e estás a ver o site.

> ⚠️ Para parar: volta ao Terminal e prime **Ctrl + C**.

## 5. (Opcional) Liga a base de dados real

Por agora o site funciona com **dados de exemplo** — perfeito para mostrar à direção.
Quando quiseres usar a base de dados real (para guardar jogos, notícias, etc.),
segue o `README.md` na secção "Como ligar a base de dados real".

## Próximos passos sugeridos

1. **Mostra o site à direção do clube** (basta partilhar o ecrã com `localhost:3000`).
2. **Muda o nome, contactos e cores** em `lib/club-config.ts` se precisares.
3. **Pede ajuda ao Claude** para qualquer ajuste — basta dizer o que queres mudar.
4. **Cria conta Supabase** quando estiveres pronto para guardar dados reais.
5. **Faz deploy no Vercel** quando quiseres pôr o site online publicamente.

---

Boa sorte, Joca! 🏓💪
