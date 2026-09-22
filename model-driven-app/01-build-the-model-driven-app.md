# Model Driven App for Lab

## Contoso Cloud Solutions
Contoso Cloud Solutions is an enterprise managed service provider delivering cloud infrastructure, security operations, and hardware maintenance to B2B clients. To streamline operational triage, their IT Operations team requires a unified Model-driven App called Contoso Support Desk to capture, validate, and escalate client-reported issues.

To maintain application lifecycle management (ALM) hygiene and avoid schema conflicts, all customizations, tables, web resources, and forms will be developed inside an isolated Power Platform Solution bound to a dedicated Contoso publisher.

### Solution and Publisher Setup

+ Publisher Display Name: `Contoso Technologies Publisher`

+ Publisher Name: `contoso_publisher`

+ Publisher Prefix: `ctp`

+ Option Value Prefix: `10000`

+ Solution Display Name: `Contoso Service Management`

+ Solution Name: `ContosoServiceManagement`

+ Installed Version: `1.0.0.0`


**Steps to Configure:**

1. Navigate to make.powerapps.com and select your development environment.

2. In the left navigation pane, select Solutions > New solution.

3. Under the Publisher dropdown, select + New publisher.

4. Set Display name to `Contoso Technologies Publisher`, Name to `contoso_publisher`, and Prefix to `ctp`. Save and close the flyout.`

5. Set Display name to `Contoso Service Management` and ensure the newly created `Contoso Technologies Publisher` is selected.

6. Click Create and open the solution.

## Dataverse Table Definition: Service Ticket (`ctp_serviceticket`)

Inside the solution, click New > Table > Table to define the primary entity:

+ Display Name: `Service Ticket`

+ Plural Name: `Service Tickets`

+ Schema Name: `ctp_serviceticket`

+ Primary Column: `ctp_name` (Display Name: `Ticket Title`)

    * **Ticket Title**

    * **Schema Name:** `ctp_name`

    * **Data Type:** Single Line of Text


    * **Configuration / Choice Values:** Required: Business Required (Primary Name)


* **Customer Type**

    * **Schema Name:** `ctp_customertype`

    * **Data Type:** Choice


    * **Configuration / Choice Values:**

    * `100000000` : Individual


    * `100000001` : Corporate


* **Priority**

    * **Schema Name:** `ctp_priority`

    * **Data Type:** Choice

    * **Configuration / Choice Values:**

    * `1` : Low

    * `2` : Medium

    * `3` : High


* **Description**

    * **Schema Name:** `ctp_description`

    * **Data Type:** Multiple Lines of Text

    * **Configuration / Choice Values:** Standard Plain Text


* **Follow-up Date**

    * **Schema Name:** `ctp_followupdate`

    * **Data Type:** Date and Time

    * **Configuration / Choice Values:** Behavior: User Local


* **Total Cost**

    * **Schema Name:** `ctp_totalcost`

    * **Data Type:** Currency

    * **Configuration / Choice Values:** Min: 0, Max: 100,000


## Form Layout Hierarchy & Schema Names


Edit the `Service Ticket` - `Information Main Form` and configure the layout structure:

+ Tab 1: tab_general (Label: General Information)

    + Section 1: section_main (Label: Ticket Details)

        + Columns: dev_name, dev_customertype, dev_priority

+ Section 2: section_corporate (Label: Corporate SLA & Follow-up)

    + Columns: dev_followupdate, dev_description

        + Tab 2: tab_billing (Label: Financials & Billing)

+ Section 1: section_billing (Label: Escalation & Budget Allocation)

    + Column: dev_totalcost



**Baseline Test Records**

Populate the following records to validate script execution across each lab module:

+ Record 1 (Corporate Escalation):

    + Ticket Title: Hardware Fault - Alpha

    + Customer Type: Corporate (100000001)

    + Priority: High (3)

    + Total Cost: $1,200.00

    + Description: Core distribution switch failing in datacenter rack B.

+ Record 2 (Standard Individual Request):

    + Ticket Title: Account Setup - Beta

    + Customer Type: Individual (100000000)

    + Priority: Low (1)

    + Total Cost: $0.00

    + Description: User onboarding request for standard mailbox setup.


## Modl Drivn App Stup `Contoso Support Desk`

Within the `Contoso Service Management` solution:

1. Click New > App > Model-driven app.

2. Set the Name to `Contoso Support Desk` (`ctp_contososupportdesk`).

3. Configure navigation in the Site Map:

    + Area: `Operations`

    + Group: `Ticket Management`

    + Page: Type: Entity/Table, Table: Service Ticket (`ctp_serviceticket`).

4. Save and publish the app.

