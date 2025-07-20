const tasks = [
  { id: 1, text: "Pengumpulan data sekunder dan observasi lapangan - Ria Ramadani" },
  { id: 2, text: "Wawancara dan identifikasi kebutuhan mitra - Nurul Imaniar" },
  { id: 3, text: "Penyusunan desain teknis alat - Nurul Imaniar" },
  { id: 4, text: "Perakitan dan pembuatan prototipe mesin - Muhammad Iqwal" },
  { id: 5, text: "Uji coba awal dan pengujian fungsi alat - Tiara Ramadhani" },
  { id: 6, text: "Pelatihan penggunaan alat kepada kelompok mitra - Febri Eka Wahyuni" },
  { id: 7, text: "Evaluasi hasil uji coba dan penyempurnaan desain - Muhammad Iqwal" },
  { id: 8, text: "Penyusunan panduan penggunaan dan dokumentasi kegiatan - Febri Eka Wahyuni" },
  { id: 9, text: "Penyusunan laporan akhir dan luaran - Ria Ramadani" }
];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const isChecked = localStorage.getItem(`task_${task.id}`) === 'true';
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.id = `task_${task.id}`;
    checkbox.addEventListener("change", () => {
      localStorage.setItem(checkbox.id, checkbox.checked);
      updateProgress();
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(label);
    taskList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const total = tasks.length;
  let completed = 0;
  tasks.forEach(task => {
    if (localStorage.getItem(`task_${task.id}`) === 'true') completed++;
  });
  const percent = Math.round((completed / total) * 100);
  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = `${percent}%`;
  progressFill.textContent = `${percent}%`;
}

function resetProgress() {
  if (confirm("Yakin ingin mereset semua progres?")) {
    tasks.forEach(task => localStorage.removeItem(`task_${task.id}`));
    renderTasks();
  }
}

function exportProgress() {
  let output = "Progress Kegiatan:\n\n";
  tasks.forEach(task => {
    const status = localStorage.getItem(`task_${task.id}`) === 'true' ? "[✓]" : "[ ]";
    output += `${status} ${task.text}\n`;
  });
  const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "progress_kegiatan.txt";
  link.click();
}

window.addEventListener("load", renderTasks);
