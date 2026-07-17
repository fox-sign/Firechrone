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

    button.dataset.firechroneModified = "true";

    button.style.display = "none";

    const fireButton = document.createElement("button");

    fireButton.textContent = BUTTON_TEXT_MAP[text];

    fireButton.style.background = "#FF7139";
    fireButton.style.color = "#FFFFFF";
    fireButton.style.border = "none";
    fireButton.style.borderRadius = "9999px";
    fireButton.style.padding = "10px 20px";
    fireButton.style.fontSize = "14px";
    fireButton.style.fontWeight = "600";
    fireButton.style.cursor = "pointer";
    fireButton.style.marginLeft = "8px";
    fireButton.style.boxShadow = "0 2px 8px rgba(0,0,0,.2)";
    fireButton.style.transition = "0.2s";

    fireButton.addEventListener("mouseenter", () => {
      fireButton.style.background = "#FF8A5B";
    });

    fireButton.addEventListener("mouseleave", () => {
      fireButton.style.background = "#FF7139";
    });

    fireButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      showModal();
    });

    button.parentNode.insertBefore(fireButton, button.nextSibling);
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
  const extensionId = getExtensionId();

  box.innerHTML = `
  <h2 style="margin:0 0 12px;color:#ff7139;">🦊 Firechrone</h2>

  <p><strong>Extension ID</strong></p>

  <code style="
    display:block;
    margin-bottom:20px;
    background:#f5f5f5;
    padding:10px;
    border-radius:8px;
    word-break:break-all;
  ">
    ${extensionId ?? "取得できませんでした"}
  </code>

  <p style="margin-bottom:20px;">
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
function getExtensionId() {
  const match = window.location.pathname.match(/\/detail\/[^/]+\/([a-z]{32})/);

  return match ? match[1] : null;
}
