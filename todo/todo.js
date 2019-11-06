let container = undefined;
const row = `
        <tr>
            <td><input type="text" placeholder="Add todo..."></td>
            <td><input type="checkbox"></td>
        </tr>`;



function startTodo(startContainer) {
    container = startContainer;
}

function addTodo(openTasks) {
    container.innerHTML += row;
    //let openTasks = document.getElementById('numberOfTasks');
    openTasks.innerText = Number(openTasks.innerText) + 1;
}


