# Lista Academica

Um organizador de tarefas voltado para estudantes, desenvolvido para ajudar no planejamento de provas, trabalhos e leituras acadêmicas com base em prioridade e prazo.

## Sobre o projeto

O projeto nasceu da dificuldade comum entre estudantes de organizar demandas acadêmicas de forma clara e eficiente. A proposta é simples: uma lista de tarefas com sistema de prioridade visual, filtros e indicadores de prazo, tudo em um único arquivo sem dependências externas.

## Funcionalidades

- Cadastro de tarefas com titulo, materia, tipo, prioridade e data de entrega
- Tres niveis de prioridade: alta, media e baixa
- Indicadores automaticos de prazo (hoje, amanha, vencido)
- Filtragem por prioridade e por status
- Ordenacao por prioridade ou por data
- Marcacao de tarefas como concluidas
- Contador de tarefas no painel superior

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript 

## Como usar

Basta abrir o arquivo `index.html` diretamente no navegador. Nenhuma instalacao ou configuracao e necessaria.
Você também pode acessar o site diretamente pelo deploy: https://to-do-list-academico.vercel.app

## Estrutura do projeto

```
planner-academico.html   Arquivo principal com toda a logica e interface
README.md                Documentacao do projeto
```

## Observacoes

As tarefas existem apenas durante a sessao atual do navegador. Ao fechar ou recarregar a pagina, os dados sao resetados. Para persistencia de dados, seria necessario integrar o uso de localStorage ou uma solucao de back-end.