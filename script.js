/* ==========================================================
   PUBLICIDAD II (MER-131) - UNIVERSIDAD INCE
   Lógica Interactiva: Pestañas de Medios, Calculadoras & Quiz
   ========================================================== */

// 1. Selector de Pestañas para el Tema 1 (Medios Publicitarios)
function switchMediaTab(mediaId) {
  // Desactivar todos los botones de pestaña
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Ocultar todos los paneles
  const panels = document.querySelectorAll('.media-panel');
  panels.forEach(panel => panel.classList.remove('active'));

  // Activar botón pulsado
  const activeBtn = Array.from(buttons).find(btn => 
    btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(mediaId)
  );
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Mostrar panel correspondiente
  const activePanel = document.getElementById(`media-${mediaId}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }
}

// 2. Calculadora de Costo por Mil (CPM)
function calcularCPM() {
  const costo = parseFloat(document.getElementById('cpm-costo').value);
  const audiencia = parseFloat(document.getElementById('cpm-audiencia').value);
  const resultadoSpan = document.getElementById('val-cpm');
  const interpretacionP = document.getElementById('interpretacion-cpm');

  if (isNaN(costo) || isNaN(audiencia) || audiencia <= 0) {
    resultadoSpan.textContent = "Error en datos";
    interpretacionP.textContent = "Por favor ingrese números válidos y una audiencia mayor a cero.";
    interpretacionP.style.color = "var(--danger)";
    return;
  }

  // Fórmula: CPM = (Costo / Audiencia) * 1000
  const cpm = (costo / audiencia) * 1000;
  
  resultadoSpan.textContent = `$${cpm.toFixed(2)}`;
  interpretacionP.style.color = "var(--text-muted)";
  interpretacionP.innerHTML = `Por cada <strong>1,000 personas impactadas</strong> por este soporte mediático, el anunciante paga <strong>RD$ ${cpm.toFixed(2)}</strong>.`;
}

// 3. Simulador de Retorno de Inversión (ROI)
function calcularROI() {
  const inversion = parseFloat(document.getElementById('roi-inversion').value);
  const ingresos = parseFloat(document.getElementById('roi-ventas').value);
  const valRoiSpan = document.getElementById('val-roi');
  const interpretacionRoiP = document.getElementById('interpretacion-roi');

  if (isNaN(inversion) || isNaN(ingresos) || inversion <= 0) {
    valRoiSpan.textContent = "Error en datos";
    interpretacionRoiP.textContent = "Por favor ingrese un monto de inversión válido mayor a cero.";
    interpretacionRoiP.style.color = "var(--danger)";
    return;
  }

  // ROI = ((Ingresos - Inversion) / Inversion) * 100
  const gananciaNeta = ingresos - inversion;
  const roi = (gananciaNeta / inversion) * 100;
  const factorRetorno = (ingresos / inversion).toFixed(2);

  if (roi >= 0) {
    valRoiSpan.textContent = `+${roi.toFixed(2)}%`;
    valRoiSpan.style.color = "var(--success)";
    interpretacionRoiP.innerHTML = `Campaña altamente rentable: por cada peso ($1.00) invertido en publicidad, se generaron <strong>$${factorRetorno}</strong> en ingresos (recuperación de capital + $${(gananciaNeta/inversion).toFixed(2)} de beneficio neto).`;
  } else {
    valRoiSpan.textContent = `${roi.toFixed(2)}%`;
    valRoiSpan.style.color = "var(--danger)";
    interpretacionRoiP.innerHTML = `Inversión deficitaria: los ingresos obtenidos ($${ingresos.toLocaleString()}) no cubrieron el costo total de la campaña ($${inversion.toLocaleString()}).`;
  }
}

// 4. Banco de Preguntas Interactivo para Estudiantes
const quizData = [
  {
    pregunta: "¿Cuál es el método técnicamente más riguroso para la elaboración del presupuesto publicitario según la doctrina publicitaria?",
    opciones: [
      "A. Método de lo que se pueda costear",
      "B. Método de Objetivos y Tareas",
      "C. Método de Paridad con el Competidor más cercano",
      "D. Método de Porcentaje sobre Ventas Pasadas"
    ],
    correcta: 1,
    explicacion: "¡Correcto! El método de Objetivos y Tareas (Tema 1.2 del Presupuesto) es el más riguroso porque define metas claras, enlista las tácticas necesarias y asigna costos directos a cada tarea específica."
  },
  {
    pregunta: "¿Qué métrica indica el porcentaje de hogares o personas sintonizando un programa de televisión específico respecto al total del universo con TV?",
    opciones: [
      "A. Share de Mercado",
      "B. Costo por Clic (CPC)",
      "C. Rating de Audiencia",
      "D. Circulación Secundaria"
    ],
    correcta: 2,
    explicacion: "¡Exacto! El Rating (Tema 1.7.4) mide el porcentaje de televisores o personas encendidas en un canal específico respecto a la base total potencial."
  },
  {
    pregunta: "¿Cuál de las siguientes es una ventaja primordial de las Revistas frente a los periódicos?",
    opciones: [
      "A. Cierre de pauta horas antes de la publicación",
      "B. Mayor inmediatez para ofertas diarias",
      "C. Larga vida útil y alta calidad gráfica/fidelidad de color",
      "D. Menor costo por mil que la radio"
    ],
    correcta: 2,
    explicacion: "¡Excelente! Las revistas (Tema 1.5) destacan por su prolongada vida útil (conservación por semanas/meses), excelente reproducción cromática y lectura secundaria compartida."
  },
  {
    pregunta: "¿Qué componente define la proposición que responde por qué el consumidor debe creer la promesa básica del anuncio?",
    opciones: [
      "A. Reason Why (Razón del porqué)",
      "B. Flighting",
      "C. Pass-along",
      "D. People Meter"
    ],
    correcta: 0,
    explicacion: "¡Muy bien! El Reason Why (Tema 2.2.2) aporta el fundamento lógico o técnico que respalda la promesa comunicacional de la campaña."
  }
];

let currentQuestionIndex = 0;

function checkQuiz(selectedIndex) {
  const q = quizData[currentQuestionIndex];
  const optionButtons = document.querySelectorAll('.opt-btn');
  const feedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextQuizBtn');

  // Deshabilitar todos los botones para evitar múltiples clics
  optionButtons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correcta) {
      btn.classList.add('correct');
    } else if (index === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedIndex === q.correcta) {
    feedback.innerHTML = `<span class="text-success"><i class="fa-solid fa-circle-check"></i> ${q.explicacion}</span>`;
  } else {
    feedback.innerHTML = `<span class="text-danger"><i class="fa-solid fa-circle-xmark"></i> Respuesta incorrecta.</span> <br><small class="text-muted">${q.explicacion}</small>`;
  }

  nextBtn.style.display = "inline-flex";
}

function loadNextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
  const q = quizData[currentQuestionIndex];

  document.getElementById('quizQuestion').textContent = q.pregunta;
  
  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.innerHTML = '';

  q.opciones.forEach((opcion, index) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.textContent = opcion;
    btn.onclick = () => checkQuiz(index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById('quizFeedback').innerHTML = '';
  document.getElementById('nextQuizBtn').style.display = 'none';
}
