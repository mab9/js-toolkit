const ToolkitController = () => {

    const Tool = (name) => {
        const showDetailsAttr = Observable(false);
        return {
            triggreShowDetails: showDetailsAttr.setValue(!showDetailsAttr.getValue()),
            onTriggerShowDetails: showDetailsAttr.onChange
        }
    };

    const toolsModel = ObservableList([]); // observable array of tools, this state is private


    const addTool = (name) => {
        const tool = Tool(name);
        toolsModel.add(tool);
        return tool;
    };

    return {
        numberOfTools: toolsModel.count,
        addTool: addTool,
        onAddTool: toolsModel.onAdd
        //onToolkitShow = () =>
    }
};

const ToolItemView = (toolkitController, rootElement) => {

    const render = tool => {
        console.info("Render tool " + tool);
        console.info(tool);
        function createElements() {
            const template = document.createElement('DIV'); // only for parsing
            template.innerHTML = `
                <div class="w3-panel w3-card">
                  <p> module - mod mod module </p>
                </div>           
            `;
            return template.children;
        }
        const [test] = createElements();
        rootElement.appendChild(test);
    };

    toolkitController.onAddTool(render);
};