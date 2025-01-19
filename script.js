const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const events = {
"2025-01-07": { description: "Inicio de labores administrativas", category: "start" },
  "2025-01-08": { description: "Solicitud de exámenes extraordinarios", category: "admin" },
  "2025-01-09": { description: "Reunión inicial del profesorado y seminarios", category: "admin" },
  "2025-01-10": { description: "Cursos y exámenes de nivelación", category: "admin" },
  "2025-01-13": { description: "Cursos y exámenes de nivelación", category: "admin" },
  "2025-01-16": { description: "Publicación de resultados de nivelación", category: "admin" },
  "2025-01-20": { description: "Inicio de clases regulares", category: "start" },
  "2025-02-05": { description: "Suspensión de clases: Aniversario de la Constitución", category: "gray" },
  "2025-02-14": { description: "Celebración del Día de la Amistad", category: "cultural" },
  "2025-03-03": { description: "Inicio del primer parcial (toda la semana)", category: "event-day" },
  "2025-03-10": { description: "Exámenes extraordinarios (2do período)", category: "admin" },
  "2025-03-13": { description: "Recepción de actas de exámenes extraordinarios", category: "admin" },
  "2025-03-14": { description: "Entrega de calificaciones del primer parcial", category: "admin" },
  "2025-03-17": { description: "Suspensión de clases: Expropiación petrolera", category: "gray" },
  "2025-03-18": { description: "Semana cultural (18 al 21 de marzo)", category: "cultural" },
  "2025-03-31": { description: "Inicio del segundo parcial (toda la semana)", category: "event-day" },
  "2025-04-10": { description: "Reunión del profesorado", category: "admin" },
  "2025-04-11": { description: "Entrega de calificaciones del segundo parcial", category: "admin" },
  "2025-04-14": { description: "Vacaciones de Semana Santa y Pascua", category: "gray" },
  "2025-04-30": { description: "Celebración del Día del Niño", category: "cultural" },
  "2025-05-01": { description: "Suspensión de clases: Día del Trabajo", category: "gray" },
  "2025-05-05": { description: "Suspensión de clases: Batalla de Puebla", category: "gray" },
  "2025-05-10": { description: "Sin actividades programadas (CCLE kids)", category: "gray" },
  "2025-05-12": { description: "Solicitudes de exámenes extraordinarios (3er período)", category: "admin" },
  "2025-05-14": { description: "Exámenes extraordinarios (3er período)", category: "admin" },
  "2025-05-16": { description: "Celebración del Día del Maestro y del Estudiante", category: "cultural" },
  "2025-06-02": { description: "Inicio del tercer parcial (toda la semana)", category: "event-day" },
  "2025-06-09": { description: "Entrega de actas del tercer parcial", category: "admin" },
  "2025-06-19": { description: "Reunión del profesorado", category: "admin" },
  "2025-06-20": { description: "Entrega de calificaciones del tercer parcial", category: "admin" },
  "2025-06-23": { description: "Semana de repaso (toda la semana)", category: "event-day" },
  "2025-06-30": { description: "Inicio de exámenes finales (toda la semana)", category: "event-day" },
  "2025-07-09": { description: "Entrega de calificaciones finales", category: "admin" },
  "2025-07-10": { description: "Solicitudes de exámenes extraordinarios finales", category: "admin" },
  "2025-07-11": { description: "Graduación y fin de ciclo escolar", category: "end" },
  "2025-07-14": { description: "Exámenes extraordinarios (6to semestre)", category: "admin" },
  "2025-07-16": { description: "Entrega de resultados de exámenes extraordinarios (6to semestre)", category: "admin" }
};


function renderCalendar() {
  const calendarContainer = document.getElementById("calendar-container");
  calendarContainer.innerHTML = "";

  for (let month = 0; month < 7; month++) {
    const monthDiv = document.createElement("div");
    monthDiv.classList.add("month");

    const header = document.createElement("h2");
    header.textContent = monthNames[month];
    monthDiv.id = `month-${month}`; // Asignamos un ID único a cada mes
    monthDiv.appendChild(header);

    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    daysOfWeek.forEach(day => {
      const dayHeader = document.createElement("div");
      dayHeader.classList.add("day-header");
      dayHeader.textContent = day;
      grid.appendChild(dayHeader);
    });

    const totalDays = new Date(2025, month + 1, 0).getDate();
    const firstDay = new Date(2025, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      const day = document.createElement("div");
      day.classList.add("inactive");
      grid.appendChild(day);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `2025-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayDiv = document.createElement("div");
      dayDiv.textContent = day;

      if (events[dateKey]) {
        dayDiv.classList.add(events[dateKey].category);
        dayDiv.addEventListener("click", () => showEventDetails(dateKey));
      }

      grid.appendChild(dayDiv);
    }

    monthDiv.appendChild(grid);
    calendarContainer.appendChild(monthDiv);
  }

  populateActivitiesList();
}

function populateActivitiesList() {
  const activitiesList = document.getElementById("activities-list");
  activitiesList.innerHTML = "";

  for (const [date, { description, category }] of Object.entries(events)) {
    const listItem = document.createElement("li");
    listItem.classList.add(category);
    listItem.innerHTML = `<span class="legend-box ${category}"></span> ${date}: ${description}`;
    listItem.addEventListener("click", () => scrollToMonth(date));
    activitiesList.appendChild(listItem);
  }
}

function scrollToMonth(date) {
  const [year, month] = date.split("-"); // Dividimos el formato "YYYY-MM-DD"
  const monthIndex = parseInt(month, 10) - 1; // Convertimos el mes en índice (0-11)
  const monthElement = document.getElementById(`month-${monthIndex}`);
  if (monthElement) {
    monthElement.scrollIntoView({ behavior: "smooth" });
  }
}

function showEventDetails(dateKey) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDetails = document.getElementById("modal-details");

  modalTitle.textContent = events[dateKey].description;
  modalDetails.textContent = `Fecha: ${dateKey}`;

  document.getElementById("google-calendar-link").href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    events[dateKey].description
  )}&dates=${dateKey.replace(/-/g, "")}/${dateKey.replace(/-/g, "")}`;

  modal.style.display = "flex";
}

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    e.target.style.display = "none";
  }
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

renderCalendar();
