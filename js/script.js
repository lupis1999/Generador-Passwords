console.log("JS cargado correctamente");

const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copyBtn");
const bars = document.querySelectorAll("#bars div");

// Slider
lengthEl.addEventListener("input", () => {
  lengthValue.textContent = lengthEl.value;
});

// Generar contraseña
generateBtn.addEventListener("click", () => {
  const password = generatePassword();

  if (!password) {
    alert("Selecciona al menos una opción");
    return;
  }

  passwordEl.value = password;
  updateStrength(password);
});

// También evalúa si escribes manualmente
passwordEl.addEventListener("input", () => {
  updateStrength(passwordEl.value);
});

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const number = "0123456789";
  const symbol = "!@#$%^&*()_+";

  let chars = "";

  if (uppercaseEl.checked) chars += upper;
  if (lowercaseEl.checked) chars += lower;
  if (numbersEl.checked) chars += number;
  if (symbolsEl.checked) chars += symbol;

  // 🔴 Si no hay opciones, no genera
  if (chars.length === 0) return "";

  let password = "";

  for (let i = 0; i < lengthEl.value; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

// Seguridad
function updateStrength(password) {
  bars.forEach(bar => bar.style.background = "transparent");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;

  const colors = ["red", "orange", "yellow", "#a4ffaf"];

  for (let i = 0; i < strength; i++) {
    bars[i].style.background = colors[strength - 1];
  }
}

// Copiar
copyBtn.addEventListener("click", () => {
  if (!passwordEl.value) {
    alert("No hay contraseña");
    return;
  }

  navigator.clipboard.writeText(passwordEl.value);
  alert("Contraseña copiada");
});


 
