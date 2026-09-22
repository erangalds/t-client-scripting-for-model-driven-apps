# Architectural Overview & Context Hierarchy
In Power Platform Model-Driven Apps, modern client scripting operates within an execution pipeline passed by the client runtime engine.

Instead of your code running arbitrarily or querying the raw web browser DOM (document.getElementById), your scripts are executed as controlled steps inside a structured event-driven lifecycle managed by the platform.

## Client Runtime Engine
The client runtime engine is the underlying framework running inside the user's browser or mobile app (built on React/Fluent UI and the Model-driven Client Architecture).

It is responsible for:

+ Fetching the record definition and data from Dataverse.
+ Rendering the form chrome, header, tabs, sections, and controls.
+ Managing form lifecycle states (initializing, rendering, editing, saving).
+ Monitoring user interactions (clicking a tab, modifying a field, clicking Save).

## The Execution Pipeline
Just like server-side plugins run in an execution pipeline with stages, the client runtime has an event-driven pipeline. When an action happens, the runtime creates a sequence of steps to process it:

+ User Action / Event Trigger: A user opens a record, edits a field, or clicks save (events like OnLoad, OnChange, OnSave).
+ Runtime Interception: The runtime engine pauses or sequences the action to evaluate registered event handlers.
+ Pipeline Order: Handlers run sequentially in the order configured in the form editor or added programmatically.
+ Execution Decision: Depending on pipeline logic (e.g., an OnSave event), a script can inspect the state or even cancel the operation (executionContext.getEventArgs().preventDefault()).

Your code does not live outside this pipeline; it is an integrated plugin-like subscriber inside it.

```javascript
function onFieldChange(executionContext) {
    // 'executionContext' was created and passed by the runtime engine
    var formContext = executionContext.getFormContext();
}
```


+ **Dynamic Context Injection**: The runtime constructs the executionContext object on the fly, encapsulating the exact event that fired, the source control/attribute that triggered it, and the pointer to the form API (getFormContext()).

+ **Isolation & Stability**: In older versions of Model Driven apps, developers used global window objects like Xrm.Page. Passing the context through the pipeline isolates scripts from global window collisions and enables identical scripts to work across main forms, quick create forms, side panes, and editable grids without modification.


## The Shift from Legacy Xrm.Page to executionContext

+ **Legacy (`Xrm.Page`)**: Bound to the global window context. It breaks inside multi-session scenarios, Unified Interface modal dialogs, side panes, and embedded subgrid row edits because Xrm.Page references only a single global form window.

+ **Modern (`executionContext`)**: Injected dynamically at runtime into every event handler. It provides an isolated handle to the exact record, subgrid, quick create form, or side pane where the user triggered the event.

