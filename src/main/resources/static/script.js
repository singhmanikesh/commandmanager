const baseUrl = "/api/commands";

async function addCommand() {
    const input = document.getElementById("commandInput").value;
    if (!input.trim()) return alert("Please enter a command");
    await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: input
    });
    document.getElementById("commandInput").value = "";
    loadCommands();
}

async function undoCommand() {
    const res = await fetch(`${baseUrl}/undo`, { method: "DELETE" });
    const text = await res.text();
    showToast(`Undone: ${text}`);
    loadCommands();
}

async function redoCommand() {
    const res = await fetch(`${baseUrl}/redo`, { method: "DELETE" });
    const text = await res.text();
    showToast(`Redone: ${text}`);
    loadCommands();
}

async function deleteAll() {
    await fetch(`${baseUrl}/deleteall`, { method: "DELETE" });
    loadCommands();
}

async function searchCommand() {
    const keyword = document.getElementById("searchInput").value;
    const res = await fetch(`${baseUrl}/search?q=${keyword}`);
    const data = await res.json();
    displayCommands(data);
}

async function peekUndo() {
    const res = await fetch(`${baseUrl}/peekundo`);
    const text = await res.text();
    showToast(`Top of Undo Stack: ${text}`);
}

async function peekRedo() {
    const res = await fetch(`${baseUrl}/peekredo`);
    const text = await res.text();
    showToast(`Top of Redo Stack: ${text}`);
}

async function loadCommands() {
    const res = await fetch(baseUrl);
    const data = await res.json();
    displayCommands(data);
}

function displayCommands(commands) {
    const list = document.getElementById("commandList");
    list.innerHTML = "";
    if (commands.length === 0) {
        const li = document.createElement("li");
        li.className = "list-group-item text-muted text-center";
        li.textContent = "No commands found.";
        list.appendChild(li);
        return;
    }
    commands.forEach(cmd => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${cmd.command}</span>
            <small class="text-muted">${new Date(cmd.timestamp).toLocaleString()}</small>
        `;
        list.appendChild(li);
    });
}

function showToast(message) {
    alert(message); // You can later upgrade this to a Bootstrap toast or modal
}

window.onload = loadCommands;
