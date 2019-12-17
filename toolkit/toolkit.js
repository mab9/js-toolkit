const ToolkitController = () => {

    const Tool = (name, newOk) => {
        const ok = newOk;
        const getName = () => name;
        const getOk = () => ok;
        const showDetailsAttr = Observable(false);
        return {
            getOk,
            getName,
            triggreShowDetails: showDetailsAttr.setValue(!showDetailsAttr.getValue()),
            onTriggerShowDetails: showDetailsAttr.onChange
        }
    };

    const toolsModel = ObservableList([]); // observable array of tools, this state is private


    const addTool = (name, ok) => {
        const tool = Tool(name, ok);
        toolsModel.add(tool);
        return tool;
    };

    return {
        addTool: addTool,
        numberOfTools: toolsModel.count,
        onAddTool: toolsModel.onAdd
        //onToolkitShow = () =>
    }
};

const ToolItemView = (toolkitController, rootElement) => {

    const render = tool => {

        // TODO vereinfachen
        let ok = tool.getOk();
        let passed = ok.filter(x => x === true).length;
        let marked = "";
        let button = "";
        if (passed < ok.length) {
            marked = "w3-flat-sun-flower";
            button = `<a href="" class="w3-button w3-right w3-flat-midnight-blue">Show</a>`;
        }

        function createElements() {
            const template = document.createElement('DIV'); // only for parsing
            template.innerHTML = `
                <div class="w3-panel w3-card ${marked}">
                  <p> ${passed} / ${ok.length} passed - ${tool.getName()} ${button}</p>
                </div>           
            `;
            return template.children;
        }

        const [test] = createElements();
        rootElement.appendChild(test);
    };

    toolkitController.onAddTool(render);
};