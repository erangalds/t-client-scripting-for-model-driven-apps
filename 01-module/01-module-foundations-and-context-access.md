# Module 1: Foundations and Context Access

**Learning Objectives**

+ Understand `executionContext` as the entry parameter

+ Retrieve the `formContext` instance safely

+ Use primary shortcuts `formContext.getAttribute()` and `formContext.getControl()`.


## Code Implementation : `ctp_serviceticket_module_1.js`

```javascript
/**
 * Namespace: ctplab.module1
 * Purpose: Context extraction and basic element targeting
 */

var ctplab = window.ctplab || {};

ctplab.module1 = {
    onLoad : function (executionContext) {
        // Step 1: Always retrieve the formContext from the executionContext
        var formContext = executionContext.getFormContext();

        if (!formContext) {
            console.error(" Module1: formContext could not be retrieved.");
            return;
        }

          
        // Define your current script version
        var scriptVersion = "v3"; 
    
        // Display the notification at the top of the form
        // Parameters: ("Message text", "Notification Level (INFO/WARNING/ERROR)", "Unique Notification ID")
        formContext.ui.setFormNotification("Running Form Script Version: " + scriptVersion, "INFO", "script_version_notification");

        // Step 2: Access attribute data using the shortcut method
        // Accessing Ticket Title Column
        var titleAttribute = formContext.getAttribute('ctp_name');
        var currentTitle = titleAttribute ? titleAttribute.getValue() : "(no title)";
        // Accessing Ticket Description Column
        var descriptionAttribute = formContext.getAttribute('ctp_description');
        var currentDescription = descriptionAttribute ? descriptionAttribute.getValue() : "(no description)";
        // Accessing Customer Type Column
        var customerTypeAttribute = formContext.getAttribute('ctp_customertype');
        var currentCustomerType = customerTypeAttribute ? customerTypeAttribute.getValue() : "(no customer type)";
        

        // Step 3 Access UI Controls using the shortcut method
        var titleControl = formContext.getControl('ctp_name');
        var isTitleVisible = titleControl ? titleControl.getVisible() : false;

        console.log("=== Module1: Context Verification ===");
        console.log("Record Title: " + currentTitle);
        console.log("Record Description: " + currentDescription);
        console.log("Customer Type: " + currentCustomerType);
        console.log("Title Control Visible: " + isTitleVisible);

    }// End of onLoad function
}// End of ctplab.module1 namespace
```

### Step-by-Step Lab Exercise

1. In your Power Apps solution, click New > More > Web resource.

2. Set Display Name to `ctp_serviceticket_module_1.js`, Type to JavaScript (JS), and paste the code above. Save and publish.

3. Open the Service Ticket Main Form in the editor.

4. Select the form surface, open the Events tab on the right sidebar, and click + Add library to include dev_serviceticket_module1.js.

5. Under On Load, add an event handler:

    + Function: `ctplab.module1.onLoad`

    + `Pass execution context as first parameter`: Checked.

6. Save and publish the form.

7. Open Record 1, press F12 to open DevTools, select the Console tab, and verify the contextual log statements.

## Key Behaviors of the Script

This script is a Microsoft Dynamics 365 / Power Apps model-driven form event handler designed to run on the form's **`onLoad`** event. Its primary purpose is basic context extraction, retrieving values of the fields in the form, and form debugging.

### Key Actions

* **Initializes a Safe Namespace:** Defines a scoped object (`ctplab.module1`) within the global window object to avoid variable name collisions.
* **Retrieves `formContext`:** Safely extracts the form execution context passed by the platform, exiting early and logging an error if it fails.
* **Displays a Version Banner:** Uses `formContext.ui.setFormNotification` to show an informational banner at the top of the form announcing that script version `"v3"` is running.
* **Reads Field Values:** Inspects three specific entity attributes—**Ticket Title** (`ctp_name`), **Description** (`ctp_description`), and **Customer Type** (`ctp_customertype`)—handling null values with fallbacks.
* **Checks UI State:** Evaluates the UI visibility state of the Title control (`ctp_name`).
* **Logs Diagnostic Data:** Outputs the extracted field values and UI visibility state to the browser developer console for verification and troubleshooting.