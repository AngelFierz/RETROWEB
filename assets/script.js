// Cada número está asociado a un conjunto de letras, como en los celulares antiguos
const buttons = {
  '1': ['1'],
  '2': ['A', 'B', 'C'],
  '3': ['D', 'E', 'F'],
  '4': ['G', 'H', 'I'],
  '5': ['J', 'K', 'L'],
  '6': ['M', 'N', 'O'],
  '7': ['P', 'Q', 'R', 'S'],
  '8': ['T', 'U', 'V'],
  '9': ['W', 'X', 'Y', 'Z'],
  '0': ['0 '] 
};

// Variables de estado para controlar la escritura
let lastKey = null;       // Última tecla presionada
let pressCount = 0;       // Número de veces que se ha presionado la misma tecla
let timeout;              // Temporizador para confirmar letra automáticamente
let output = '';          // Texto final acumulado

// elementos del DOM que se van a manipular
const outputText = document.getElementById('output-text'); // Pantalla del Nokia
const keys = document.querySelectorAll('.key');            // Botones del teclado
const deleteBtn = document.getElementById('delete');       // Botón de borrar
const tvContent = document.getElementById('tv-content');   // Imagen dentro de la TV

// escucha clics en cada tecla del teclado Nokia
keys.forEach(key => {
  key.addEventListener('click', () => {
    const keyValue = key.dataset.key; // Obtiene el valor de la tecla presionada

    // Si se presiona la misma tecla varias veces, cambia la letra
    if (keyValue === lastKey) {
      pressCount++;
    } else {
      // Si se cambia de tecla, confirma la letra anterior
      confirmLetter();
      lastKey = keyValue;
      pressCount = 1;
    }

    // Reinicia el temporizador para confirmar letra automáticamente
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      confirmLetter();     // Confirma letra si no se presiona nada en 1 segundo
      lastKey = null;
      pressCount = 0;
    }, 1000);

    // Muestra la letra temporal en pantalla según el número de presiones
    const letters = buttons[keyValue];
    if (letters) {
      const currentChar = letters[(pressCount - 1) % letters.length]; // Cicla entre letras
      outputText.textContent = output + currentChar; // Muestra letra provisional
    }
  });
});

// clic en el botón de borrar
deleteBtn.addEventListener('click', () => {
  output = output.slice(0, -1);           // Elimina el último carácter del texto
  outputText.textContent = output;        // Actualiza la pantalla
  updateTV(output);                       // Cambia la imagen de la TV si aplica
  lastKey = null;
  pressCount = 0;
  clearTimeout(timeout);                  // Cancela el temporizador
});

//confirma la letra escrita y la agrega al texto final
function confirmLetter() {
  if (lastKey && buttons[lastKey]) {
    const letters = buttons[lastKey];
    const confirmedChar = letters[(pressCount - 1) % letters.length];
    output += confirmedChar;              // Agrega la letra al texto final
    outputText.textContent = output;      // Actualiza la pantalla
    updateTV(output);                     // Actualiza la imagen de la TV si detecta palabras clave
  }
}

// 🔊 Constantes: ícono de computadora y sonido de inicio XP
const computerTrigger = document.getElementById('computer-trigger');
const computerSound = new Audio('images/windows-xp-startup_1ph012n.mp3'); // Sonido de inicio XP

// 🧠 Evento: clic en el ícono de computadora
computerTrigger.addEventListener('click', () => {
  computerSound.currentTime = 0; // Reinicia el sonido desde el principio
  computerSound.play();         // Lo reproduce
});

// actualiza la imagen de la TV según el texto escrito
function updateTV(text) {
  const lowerText = text.toLowerCase(); // Convierte el texto a minúsculas para comparar

  // Cambia la imagen de la TV si detecta ciertas palabras clave, tipo narison y esas cosas
  if (lowerText.includes('narison')) {
    tvContent.src = 'images/narison.png';
  } else if (lowerText.includes('no')) {
    tvContent.src = 'images/no.jpeg';
  } else if (lowerText.includes('si')) {
    tvContent.src = 'images/si.jpeg';
  } else if (lowerText.includes('cat')) {
    tvContent.src = 'images/cat.gif';
  } else if (lowerText.includes('sabado')) {
    tvContent.src = 'images/sabado.gif';
  } else {
    tvContent.src = 'images/Television_static.gif'; // Imagen por defecto (pantalla vacía)
  }
}
