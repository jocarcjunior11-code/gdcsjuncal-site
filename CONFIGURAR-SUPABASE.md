# Configurar o Supabase — guia passo a passo

> O Supabase é a "caixa" onde vão ficar guardados os dados do site:
> jogos, resultados, notícias, fotos, inscrições, etc.
> É **gratuito** até quantidades que o clube nunca vai atingir.

---

## FASE 1 — Criar conta no Supabase (5 min)

### Passo 1.1
Abre o browser e vai a: **https://supabase.com**

### Passo 1.2
Clica no botão **"Start your project"** (verde, canto superior direito).

### Passo 1.3
Faz sign-up com:
- **Email** + palavra-passe que escolheres, OU
- **Conta Google** (mais rápido)

> 💡 **Anota a palavra-passe** num sítio seguro. Vais precisar dela mais à frente.

### Passo 1.4
Depois de criar conta, o Supabase pede para criares uma "Organization".
Dá-lhe um nome qualquer — sugiro: **GDCS Juncal**

---

## FASE 2 — Criar o projeto (3 min)

### Passo 2.1
No painel do Supabase, clica em **"New Project"**.

### Passo 2.2
Preenche assim:
- **Project name:** `gdcsjuncal` (tudo minúsculas, sem espaços)
- **Database Password:** clica em "Generate a password" e **COPIA-a** para um sítio seguro (Bloco de Notas, Notas do telemóvel, qualquer coisa). Vais precisar.
- **Region:** escolhe **"West EU (London)"** ou **"West EU (Paris)"** — Açores fica mais próximo destes
- **Pricing Plan:** mantém **Free** (não precisas pagar)

### Passo 2.3
Clica em **"Create new project"** (botão verde).

### Passo 2.4
O Supabase vai demorar **1-2 minutos** a preparar tudo. Verás uma roda a girar. Espera.

---

## FASE 3 — Carregar o "esqueleto" da base de dados (5 min)

### Passo 3.1
No menu da esquerda, clica no ícone **"SQL Editor"** (parece uma folha com `</>`).

### Passo 3.2
Clica em **"New query"** (botão verde, canto superior direito).

### Passo 3.3
Abre o ficheiro `supabase/schema.sql` da tua pasta `Site-Clube`:
- Caminho: `C:\Users\Utilizador\Documents\Claude\Projects\Site-Clube\supabase\schema.sql`
- Abre com o Bloco de Notas (botão direito → Abrir com → Bloco de Notas)

### Passo 3.4
**Seleciona TUDO** (Ctrl+A) → **Copia** (Ctrl+C)

### Passo 3.5
Volta ao Supabase, cola na área de texto (Ctrl+V).

### Passo 3.6
Clica no botão **"Run"** (verde, canto inferior direito) ou prime **Ctrl+Enter**.

### Passo 3.7
Espera 5-10 segundos. Verás "Success. No rows returned" — está tudo bem.

> ⚠️ Se aparecer um erro, tira print e manda-me. Eu ajudo a resolver.

### Passo 3.8 — Carregar dados de exemplo (opcional)

Repete os passos 3.2 a 3.7 mas desta vez com o ficheiro `supabase/seed.sql`.

Isto carrega os exemplos (jogos da época, atletas, etc.) para o site não aparecer vazio na primeira vez. Mais tarde apagas estes e pões os teus dados reais.

---

## FASE 4 — Apanhar as 3 "chaves" do projeto (2 min)

Vais precisar destas para o site falar com o Supabase.

### Passo 4.1
No menu da esquerda, vai ao **ícone de engrenagem** ("Settings", em baixo).

### Passo 4.2
Clica em **"API"** dentro do Settings.

### Passo 4.3
Vais ver 3 valores. Copia-os e guarda num ficheiro Bloco de Notas seguro:

1. **Project URL** — algo tipo `https://xxxxxx.supabase.co`
2. **anon public** (key) — uma string longa
3. **service_role** (key) — outra string longa, **NÃO partilhes com ninguém**

> 🔑 Estas 3 chaves são o "endereço" e a "fechadura" da tua base de dados. Guarda-as bem.

---

## FASE 5 — Criar a conta de administrador (3 min)

### Passo 5.1
No menu da esquerda, clica em **"Authentication"** (ícone de cadeado).

### Passo 5.2
Vai ao separador **"Users"** (em cima).

### Passo 5.3
Clica em **"Add user"** → **"Create new user"**.

### Passo 5.4
Preenche:
- **Email:** o teu email (`jocarcjunior11@gmail.com`) ou o email do presidente do clube
- **Password:** uma password forte (mas que te lembres!)
- **Auto Confirm User:** ✅ ativa (assim entras logo, sem precisar de confirmar por email)

### Passo 5.5
Clica em **"Create user"**.

✅ **Pronto.** Agora tens base de dados configurada **+ uma conta para entrar no painel admin do site**.

---

## E agora?

Diz-me que chegaste a este ponto e eu guio-te na **Fase 6: deploy do site no Vercel**.

A Fase 6 é onde:
- Pomos o site online com um URL público
- Ligamos as 3 chaves do Supabase ao site
- A direção começa a poder usar o painel admin a sério

---

**Boa, Joca! Cada passo é simples — só temos de ir um de cada vez.** 🏓
