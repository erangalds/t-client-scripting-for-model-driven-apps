# Foundations and Core Architecture

## `executionContext`
The `executionContext` is the primary argument supplied by the event infrastructure when `Pass execution context as first parameter` is checked in the form or column configuration dialog. 

+ Primary Method `executionContext.getFormContext()`

    + Returns: The `formContext` object corresponding to the current form or grid context.

+ Secondary Utility Methods: 
    + `getEventSource()`: Returns the specific attribute or control that fired the event
    
    + `getEventArgs()`: Returns event arguments, particularly critical during `OnSave` events to evaluate save modes or cancel operations ( `e.preventDefault()` ).
    
    + `getDepth()`: Returns the execution depth to identify circular scripting loops (e.g. an `OnChange` script modifying a field that triggers the same `OnChange`).


## `formContext` Root shortcuts
While the object model divides strictly into .data (business logic) and .ui (visual controls), the API provides two first-class shortcut methods directly on formContext:


### `formContext.getAttribute(arg)`

Bypasses the formContext.data.entity tree to immediately target an underlying column value.

**Syntax**: `formContext.getAttribute(arg)`

**Arguments**: `arg` (optional string or number): The logical schema name of the column (e.g., "`dev_priority`"), or an index number. If omitted, returns an array of all attributes on the form.

**Return Type**: An attribute object (or collection).

**When to use**: Whenever you need to read (`getValue()`), write (`setValue()`), or listen to (`addOnChange()`) data values.

### `formContext.getControl(arg)`

Bypasses the `formContext.ui.controls` collection to retrieve a specific visual element on the form.

**Syntax**: `formContext.getControl(arg)`

**Arguments**: `arg` (optional string or number): The name of the control (usually matches the schema name, but header/footer controls have prefixes such as "header_dev_priority"). If omitted, returns an array of all controls.

**Return Type**: A control object (or collection).

**When to use**: Whenever you need to show/hide (`setVisible()`), enable/disable (`setDisabled()`), or badge (`addNotification()`) an input element.

