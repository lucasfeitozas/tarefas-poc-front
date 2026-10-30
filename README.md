# tarefas-poc-front

App Angular simples de cadastro e visualização de tarefas, validado pelos testes E2E do [tarefas-poc-cypress](https://github.com/lucasfeitozas/tarefas-poc-cypress).

As tarefas ficam no `localStorage` do navegador (sem backend).

## Rodando localmente

```bash
npm ci
npm start          # http://localhost:4200
npm test           # testes unitários (Vitest)
npm run build
```

## Funcionalidades

- Cadastro de tarefa com título (obrigatório, até 80 caracteres) e descrição opcional.
- Listagem da mais recente para a mais antiga, com contador de pendentes.
- Marcar como concluída, remover e filtrar por Todas / Pendentes / Concluídas.

Os elementos usados nos testes têm atributos `data-cy` (ex.: `task-title-input`, `task-submit`, `task-item`). Ao mudar o HTML, mantenha esses atributos ou ajuste os testes no repo do Cypress.

## Pipeline (`.github/workflows/ci.yml`)

1. **build**: `npm ci`, testes unitários, build e upload do artefato `tarefas-front-dist`.
2. **e2e**: chama o workflow reutilizável `lucasfeitozas/tarefas-poc-cypress/.github/workflows/e2e.yml@main`, que serve o build e roda o Cypress. Se um teste falhar, a pipeline falha.
3. **deploy**: só em push na `main` e só se o E2E passar, publica no GitHub Pages (https://lucasfeitozas.github.io/tarefas-poc-front/).

O Pages precisa estar com a fonte "GitHub Actions" (Settings > Pages).
