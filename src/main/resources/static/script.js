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
    alert(`Undone: ${text}`);
    loadCommands();
}

async function redoCommand() {
    const res = await fetch(`${baseUrl}/redo`, { method: "DELETE" });
    const text = await res.text();
    alert(`Redone: ${text}`);
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
    alert(`Top of Undo Stack: ${text}`);
}

async function peekRedo() {
    const res = await fetch(`${baseUrl}/peekredo`);
    const text = await res.text();
    alert(`Top of Redo Stack: ${text}`);
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
        li.className = "list-group-item text-muted";
        li.textContent = "No commands found.";
        list.appendChild(li);
        return;
    }
    commands.forEach(cmd => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${cmd.command} - ${cmd.timestamp}`;
        list.appendChild(li);
    });
}

window.onload = loadCommands;
