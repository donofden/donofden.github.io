---
layout: post
title: "How to get Google app Client ID and Client Secret"
date: 2019-08-24
author: DonOfDen
tags: [Google API, API, CLIENT ID, Client Secret, Gmail]
description: To work with Google APIs, you will need Google API Console project and Client Id. Which you can use to call different Google APIs. We wanted to integrate Google Sign-In into my CLI Application.
---
## Turn on the Gmail API

To work with Google APIs, you will need Google API Console project and Client Id. Which you can use to call different Google APIs. We wanted to integrate Google Sign-In into my CLI Application.

 The following will explains how to create Google API Console project, client ID and client Secret.

1. Login to Google Developer Console at https://console.developers.google.com using your google account credentials.

2. If you are not registered on Google developer account, then you need to accept agreement.

![Full screen](/images/doc/step-1.png)

3. After accepting agreement or if you are already registered on Google developer account, you will see a screen as shown below. Click on “Select a project” on top header bar.

![Full screen](/images/doc/step-2.png)

4. From the project selection popup click on the button with plus icon to add new project.

![Full screen](/images/doc/step-3.png)

5. Enter your “Project name” (in my case its "tale-gamil") and click on “Create” button.

![Full screen](/images/doc/step-4.png)

6. It will open list page of API and Services. (you can also open this page from left side menu bar > “Library” menu)

![Full screen](/images/doc/step-6.png)

7. From the list page search API with name “Gmail API” and click on the box with name “Gmail API”.

![Full screen](/images/doc/step-7.png)

8. It will show the detail page of “Gmail API”, click on “Enable” button and it will return you back to dashboard.

9. From the dashboard click on “Credentials” from the left side menu.

10. From “Credentials” page click on “Create credentials” tab and select "OAuth Client ID". Then click on “Save” button.

![Full screen](/images/doc/step-10.png)
![Full screen](/images/doc/step-10.2.png)
![Full screen](/images/doc/step-10.1.png)

It will display the popup with client id and client secret.

![Full screen](/images/doc/step-11.png)

Share your thoughts via twitter @aravind_kumar_g ``¯\_(ツ)_/¯``