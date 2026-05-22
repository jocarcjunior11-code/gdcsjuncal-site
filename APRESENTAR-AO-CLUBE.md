# Como pôr o site no ar para mostrar à direção

> Guia simples, sem programação. Em 5 minutos tens um **URL público** que podes partilhar por WhatsApp ou email.

---

## OPÇÃO 1 — Netlify Drop (a mais simples, gratuita) ⭐ RECOMENDADA

**Em 60 segundos. Sem criar conta. Sem instalar nada.**

1. Abre **https://app.netlify.com/drop** no teu browser
2. Vai à pasta `C:\Users\Utilizador\Documents\Claude\Projects\Site-Clube`
3. **Arrasta o ficheiro `index.html`** para dentro da página do Netlify
4. Espera 10 segundos — o Netlify dá-te um URL tipo:
   `https://wonderful-juncal-1234.netlify.app`
5. **Pronto.** Partilha esse URL com quem quiseres.

> 💡 Se quiseres um URL mais bonito (ex: `gdcsjuncal.netlify.app`), cria conta grátis no Netlify e podes mudar o nome.

---

## OPÇÃO 2 — Vercel (também grátis, mais "profissional")

1. Abre **https://vercel.com/new** (cria conta grátis com email ou GitHub)
2. Escolhe "Import from local"
3. Arrasta a pasta inteira `Site-Clube`
4. Clica em **Deploy**
5. Em ~2 minutos tens URL público

---

## OPÇÃO 3 — Domínio próprio do clube (`gdcsjuncal.pt`)

Se o clube já tem o domínio `gdcsjuncal.pt` (vi no Facebook que sim), podes apontá-lo para o Netlify/Vercel mais tarde, gratuitamente.

Diz-me quando chegares a esse ponto e eu explico passo a passo.

---

# E o painel admin a funcionar a sério?

A versão atual (HTML) é uma **maquete navegável** — perfeita para apresentar ao clube, mas o admin é só visual (não guarda dados).

Para ter um admin **real** (onde a direção pode editar jogos, escrever notícias e fazer upload de fotos), precisamos do projeto Next.js + Supabase que já está construído na pasta. Quando estiveres pronto, fazemos isto em conjunto:

### Passos resumidos (faço contigo quando quiseres)

1. **Criar conta gratuita no Supabase** (https://supabase.com)
2. **Colar dois ficheiros SQL** no Supabase (já preparados em `/supabase/`)
3. **Criar a tua conta de admin** no Supabase
4. **Fazer deploy no Vercel** com 3 chaves do Supabase
5. **Apontar o domínio gdcsjuncal.pt** para o Vercel

Total: cerca de 1-2 horas, contigo a clicar e eu a explicar cada passo. Detalhes no `README.md`.

---

# Conselho para a apresentação à direção

**Mostra a maquete primeiro** (URL Netlify). É visual, navegável e prova o conceito sem custos. Depois, se a direção der luz verde, ativamos o backend real.

Tudo o que o clube precisa de saber:

- ✅ Site institucional **moderno e responsivo** (funciona no telemóvel)
- ✅ Mostra **resultados, jogos, equipas, ginásio, notícias**
- ✅ Dados oficiais já carregados (1ª Divisão Feminina 2025/26 — fonte FPTM)
- ✅ Identidade do clube respeitada (logo, cores, conquistas, atletas reais)
- ✅ **Formulários de inscrição** para ginásio e ténis de mesa
- ✅ Painel de administração simples para a direção (sem precisar de programador)
- ✅ Custos de manutenção: **0€/mês** (Netlify, Vercel e Supabase têm planos gratuitos suficientes)

---

Boa apresentação, Joca! 🏓💪
