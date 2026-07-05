const BUTTON_TEXT_MAP = {
  "Chrome に追加": "🦊 Firechroneで追加",
  "Add to Chrome": "🦊 Add with Firechrone"
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
    subtree: true
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startObserver);
} else {
  startObserver();
}