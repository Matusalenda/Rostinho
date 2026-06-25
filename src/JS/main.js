import {
  initFocus,
  customAlert,
  switchView,
  clear,
  toggleAutoButton,
} from "./modules/utils.js";
import { view1, view2, appState } from "./modules/state.js";
import { keyboardHandler } from "./modules/keyboard.js";
import { printData } from "./modules/printData.js";


// Script está no final do body, DOM já está pronto
initFocus();
view1Setup();
view2Setup();

function view1Setup() {
  view1.enterBtn.addEventListener("click", () => {
    if (view1.inputName.value.trim() !== "") {
      appState.operatorName = view1.inputName.value.trim().toUpperCase();
      switchView("next");
    } else {
      customAlert("Insira o nome do operador!");
    }
  });
}

export function view2Setup() {
  view2.backBtn.addEventListener("click", () => switchView("back"));

  view2.printBtn.addEventListener("click", () => printData());

  view2.clearBtn.addEventListener("click", () => clear());

  view2.modeBtn.addEventListener("click", () => toggleAutoButton());

  document.addEventListener("keydown", keyboardHandler);
}

// Restaura foco quando volta após minimizar
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    initFocus();
  }
});
