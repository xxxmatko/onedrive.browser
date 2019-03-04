# OneDrive Browser
Simple browser application that makes requests to the OneDrive API.

## Turn on the Drive API
1. Register your own application on the Microsoft application portal https://apps.dev.microsoft.com.
1. Click **Add an app**.
1. Name your application `OneDrive Browser` and click **Create application**.
1. Click **Save**.
1. The **Application Id** displayed in the **Properties** section will be the value of the `client_id` in the API Builder credential. 
1. You also need to create a `client_secret`and set the `clientId` and `redirectUri` variables accordingly.
1. Click **Generate New Password**. The value displayed will be your `client_secret`, this is the only time it's visible, so make a note of the value and don't lose it. If you lose it, you can repeat this step to generate a new client secret.
1. You need to add OAuth support to your application and add the redirect URI. Under **Platforms**, click **Add Platform**.
1. Select **Web**. This will add a **Web panel** to the Platforms list.
1. Check **Allow Implicit Flow** (your application will be doing an implicit grant).
1. Set the **Redirect URLs** to `http://localhost:8020/callback`.
1. In order to read the users files click **Add** next to Delegated Permissions. From the list select:
	* Files.Read
	* Files.Read.All
	* User.Read
	* Sites.Read.All
	* offline_access
1. Click **Ok** and if you haven't already done it, save your application.

## Run the sample
1. Download the source code of this repository.
1. Open the folder with [Visual Studio Code](https://code.visualstudio.com/).
1. In order to build the project install [node.js](https://nodejs.org/en/).
1. Run the `restore` task by pressing `Ctrl + Shift + B` and choose `restore`.
1. To build the application run the `build:Debug` task by pressing `Ctrl + Shift + B` and choose `build:Debug`.
1. Run the application by pressing `Ctrl + Shift + B` and choose `launch:Debug`.