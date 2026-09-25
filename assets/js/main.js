// Small progressive-enhancement helpers. The site works fine without JS.

// Current year in the footer
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Copy-to-clipboard buttons on code blocks
document.querySelectorAll(".code__copy").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var block = btn.closest(".code");
    var code = block && block.querySelector("pre");
    if (!code) return;
    navigator.clipboard.writeText(code.innerText).then(function () {
      var original = btn.textContent;
      btn.textContent = "copied";
      setTimeout(function () { btn.textContent = original; }, 1400);
    });
  });
});
