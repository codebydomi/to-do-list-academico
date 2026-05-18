const PRIORITY_ORDER = { alta: 0, media: 1, baixa: 2 };

let tasks = [
  {
    id: 1,
    title: "Estudar derivadas e integrais",
    subject: "Cálculo",
    type: "Prova",
    priority: "alta",
    date: datePlus(1),
    done: false,
  },
  {
    id: 2,
    title: "Relatório de laboratório",
    subject: "Física",
    type: "Trabalho",
    priority: "media",
    date: datePlus(4),
    done: false,
  },
  {
    id: 3,
    title: "Leitura dos capítulos 8 a 10",
    subject: "História",
    type: "Leitura",
    priority: "baixa",
    date: datePlus(7),
    done: true,
  },
];

let currentFilter = "todas";

function datePlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function addTask() {
  const title = document.getElementById("inp-title").value.trim();
  if (!title) {
    document.getElementById("inp-title").focus();
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    subject: document.getElementById("inp-subject").value.trim(),
    type: document.getElementById("inp-type").value,
    priority: document.getElementById("inp-priority").value,
    date: document.getElementById("inp-date").value,
    done: false,
  });

  document.getElementById("inp-title").value = "";
  document.getElementById("inp-subject").value = "";
  document.getElementById("inp-date").value = "";
  document.getElementById("inp-priority").value = "media";
  render();
}

function toggleDone(id) {
  const t = tasks.find((t) => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function setFilter(btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  render();
}

function dateLabel(dateStr, done) {
  if (!dateStr) return "";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + "T00:00");
  const diff = Math.round((d - today) / 86400000);
  if (done)
    return ` ${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`;
  if (diff < 0) return `<span class="vencido">⚠ Vencido</span>`;
  if (diff === 0) return `<span class="urgente">⏰ Hoje!</span>`;
  if (diff === 1) return `<span class="urgente">⏰ Amanhã</span>`;
  return ` ${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}`;
}

function render() {
  // Filtrar
  let list = tasks.filter((t) => {
    if (currentFilter === "done") return t.done;
    if (currentFilter === "todas") return true;
    return !t.done && t.priority === currentFilter;
  });

  // Ordenar
  const sort = document.getElementById("sort-select").value;
  if (sort === "prioridade") {
    list.sort(
      (a, b) =>
        PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] ||
        (a.done ? 1 : -1),
    );
  } else {
    list.sort((a, b) =>
      !a.date ? 1 : !b.date ? -1 : a.date.localeCompare(b.date),
    );
  }

  // Renderizar
  const el = document.getElementById("task-list");
  if (list.length === 0) {
    el.innerHTML = `<div class="empty">Nenhuma tarefa encontrada.</div>`;
  } else {
    el.innerHTML = list
      .map(
        (t) => `
        <div class="task ${t.priority} ${t.done ? "done" : ""}">
          <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggleDone(${t.id})">
          <div class="task-body">
            <div class="task-title">
              <span>${t.title}</span>
              <span class="badge ${t.priority}">${t.priority === "alta" ? "Alta" : t.priority === "media" ? "Média" : "Baixa"}</span>
            </div>
            <div class="task-meta">
              ${t.subject ? `<span> ${t.subject}</span>` : ""}
              ${t.type ? `<span>${t.type}</span>` : ""}
              ${t.date ? `<span>${dateLabel(t.date, t.done)}</span>` : ""}
            </div>
          </div>
          <button class="btn-del" onclick="deleteTask(${t.id})" title="Remover">×</button>
        </div>
      `,
      )
      .join("");
  }

  // Stats
  document.getElementById("stat-total").textContent = tasks.length;
  document.getElementById("stat-alta").textContent = tasks.filter(
    (t) => t.priority === "alta" && !t.done,
  ).length;
  document.getElementById("stat-done").textContent = tasks.filter(
    (t) => t.done,
  ).length;
}

// Enter para adicionar
document.getElementById("inp-title").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

render();
