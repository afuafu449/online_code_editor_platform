const codeEl = document.getElementById("code");
const runBtn = document.getElementById("run");
const saveBtn = document.getElementById("save");
const fileInput = document.getElementById("filename");
const preview = document.getElementById("preview");

function runCode() {
  preview.srcdoc = codeEl.value;
  localStorage.setItem("onlineCodeEditor:lastCode", codeEl.value);
}

function saveAs() {
  const filename = fileInput.value.trim() || "index.html";
  const blob = new Blob([codeEl.value], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

runBtn.addEventListener("click", runCode);
saveBtn.addEventListener("click", saveAs);

window.addEventListener("keydown", e => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    runCode();
  }
  if (e.key.toLowerCase() === "s" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    saveAs();
  }
});

const previous = localStorage.getItem("onlineCodeEditor:lastCode");
if (previous) codeEl.value = previous;
runCode();
