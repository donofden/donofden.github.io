---
layout: post
title: "Scrum Master - Burndown - Automation"
date: 2019-08-20
author: DonOfDen
tags: [Scrum Master, Jenkins, Jira, ADO, Slack, Blog]
description: In the automation world, how a ScrumMaster can do better by automating his daily work and reduce workload to focus more.
---
![blog-head-image](/images/doc/jira-and-slack.PNG)

Oops.., So this is my first blog, Hope I continue writing more in future on the tech I working on. Moreover, this blog is a reference for my work because usually, I forget what I did in the past ( hahaha).

Ok, let's start. You probably saw many blogs on Jira, Scrum Master, and Slack. But this post is to explain how I integrated Jira with Slack to reduce my daily workload. As a scrum master, I wanted to know the sprint burndown on regular basis and I believe all team members are professionals, we don't go and ask for this work on a daily basis instead we can share where we are heading to in terms of a team effort on a sprint. this will understand their role and important works. So in order to do it, I planned to calculate the Burndown of the team and post to our slack channel. This is getting a wider audience on where we are up to in the sprint.

As a Scrum Master/Developer its not always easy to do multiple things in one day, so I decided to write a script which fetches details from our JIRA board and calculates the team's velocity (from the story points), then posts the values into our SLACK Channel.

so I now no longer need to run or calculate the Burndown chart myself. Instead, I create a pipeline job in Jenkins that is triggered every day at 1 AM, secondly, a Python Script is run to fetch the details from JIRA and calculate. The result is a Burndown calculation in Slack.

![Full screen](/images/doc/slack-post.jpg)

If you see the above message, we get the following:
- Date.
- The board columns with a number of cards and story points.

The above method is useful for predicting the progress of the team and is an indication of when all of the work will be completed. Having the Burndown chart posted in our slack channel helps the team prioritize their day. Since we are a Scrum Team we are "Self-organized" so I was a Scrum Master no longer need to remind the team on a "delivery deadline".

Furthermore, this solves a number of problems for me, I don't need to run the report on a daily basis to take a note of it (this means I no longer need to check the board when I'm on holiday, or other team members are on holiday, don't forget we have a collaborated team in the UK & India).  I can search the slack posts easily once a week or whenever I get time to prepare the Burndown report.

If you wish to do this for your team, following repo's will help:

- [CLI script to retrieving data from JIRA](https://github.com/donofden/jira-project-burndown-slack)
- [CLI script to retrieving data from ADO](https://github.com/donofden/ado-project-burndown-slack)

There is a detailed [`README.md`](https://github.com/donofden/jira-project-burndown-slack/blob/master/README.md) on each repo which will help you end-to-end on setting this up. Hope my first blog post is useful to you. Share your thoughts via twitter @aravind_kumar_g ``¯\_(ツ)_/¯``