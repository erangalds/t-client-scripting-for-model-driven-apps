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