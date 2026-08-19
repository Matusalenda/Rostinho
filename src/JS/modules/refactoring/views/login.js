export function loginView() {
  return `<header class="top">
        <span>ROSTINHO</span>
      </header>
      <div class="inputNAME">
        <div class="input-group">
          <label class="labels" for="NAME">OPERADOR</label><br />
          <input type="text" id="NAME" name="ID" autocomplete="off" />
        </div>
      </div>

      <footer class="bottom">
        <button class="btns_invisible" tabindex="-1">INVIS</button>
        <button class="btns_invisible" tabindex="-1">INVIS</button>
        <button class="btns_invisible" tabindex="-1">INVIS</button>
        <button class="btns_visible" id="enterBtn" tabindex="-1">ENTER</button>
      </footer>
    
    `;
}

export function loginViewInit(router, error) {
  const nameInput = document.getElementById("NAME");
  const enterBtn = document.getElementById("enterBtn");

  enterBtn.addEventListener("click", () => {
    const value = nameInput.value.trim().toUpperCase();
    value !== "" && ValidateInput(value) ? router() : error("Usuário inválido");
  });
}
