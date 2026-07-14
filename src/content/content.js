const BUTTON_TEXT_MAP = {
  "Chrome に追加": "🦊 Firechroneで追加",
  "Add to Chrome": "🦊 Add with Firechrone",
};

function replaceInstallButtons() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    const text = button.textContent.trim();

    if (!(text in BUTTON_TEXT_MAP)) {
      return;
    }

    if (button.dataset.firechroneModified === "true") {
      return;
    }

    button.textContent = BUTTON_TEXT_MAP[text];
    button.dataset.firechroneModified = "true";

    button.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        showModal();
      },
      true,
    );

    console.log("[Firechrone] Install button replaced.");
  });
}

function startObserver() {
  replaceInstallButtons();

  const observer = new MutationObserver(() => {
    replaceInstallButtons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver);
} else {
  startObserver();
}

function showModal() {
  if (document.getElementById("firechrone-modal")) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "firechrone-modal";

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.45)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "2147483647";

  const box = document.createElement("div");
  box.style.width = "380px";
  box.style.background = "#fff";
  box.style.borderRadius = "16px";
  box.style.padding = "24px";
  box.style.boxShadow = "0 12px 40px rgba(0,0,0,.25)";
  box.style.fontFamily = "system-ui, sans-serif";

  box.innerHTML = `
    <h2 style="margin:0 0 12px;color:#ff7139;">🦊 Firechrone</h2>

    <p style="margin:0 0 20px;">
      Chrome拡張を確認しています...
    </p>

    <button id="firechrone-close"
      style="
        background:#ff7139;
        color:white;
        border:none;
        padding:10px 18px;
        border-radius:8px;
        cursor:pointer;
      ">
      閉じる
    </button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("firechrone-close").addEventListener("click", () => {
    overlay.remove();
  });
}
