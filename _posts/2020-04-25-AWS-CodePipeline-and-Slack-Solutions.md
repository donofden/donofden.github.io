---
layout: post
title: "AWS CodePipeline and Slack Solutions"
date: 2020-04-25
author: DonOfDen
tags: [AWS, Amazon, CodePipeline, Slack, Integration, Automation, AWS Lambda, SNS Topic, CloudWatch]
description: Do you want to get a notification about the deployment progress in your slack channel?
---

# AWS CodePipeline and Slack Solutions

Do you want to get a notification about the deployment progress in your slack channel?

This blog is all about integrating AWS CodePipeline failures to a slack channel. In case of any failures in the pipeline, AWS Cloudwatch Event is triggerred which sends a notification on a slack channel using SNS & AWS Lambdas.

To do that we are going to use/integrate the follwing services:

![blog-head-image](/images/doc/AWS-CodePipeline-and-Slack-Solutions.jpeg)

## AWS CodePipeline

> As you all know, AWS CodePipeline is an Amazon Web Services product that automates the software deployment process.

Our goal is to notify us when a CodePipeline fails.

Following is my Pipeline list screen, what we are intrested in is the `Name` of the Pipeline. 

![blog-head-image](/images/doc/aws-codepipeline-blog-1.png)

## SNS Topic

> Amazon SNS allows applications to send time-critical messages to multiple subscribers through a “push” mechanism, eliminating the need to periodically check or “poll” for updates.

Step  | Details
------------- | -------------
1  | Go to `AWS Console -> Services -> SNS -> Create topic`
2 | Enter topic name as `pipelines-failure-event`
3 | Select the above created topic
4 | Click `Create Subscription` & select Protocol as `AWS Lambda.`
5 | Select above created `slack-alerts` Lambda function as Endpoint & Create subscription.

## AWS Lambda

> AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. You can use AWS Lambda to extend other AWS services with custom logic, or create your own back-end services that operate at AWS scale, performance, and security.

Step  | Details
------------- | -------------
1 | Go to `AWS Console -> Services -> Lambda -> Create Function`
2 | Provide function name as `slack-alerts` & select runtime as `Python 2.7` or `Python 3.6`.
3 | Choose `Create Custom Role` which will open up a new page for role creation.
4 | Give role name as `slack_alerts_lambda_role` & Click on `Allow`.
5 | Add code from `lambda_handler.py` to Function Code section
6 | Add environment variables `SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXXXX`
7 | Save this `Lambda`.

My `lambda_handler.py`:

```python
import json
import logging
import os
from urllib2 import Request, urlopen, URLError, HTTPError

# Read environment variables
SLACK_WEBHOOK_URL = os.environ['SLACK_WEBHOOK_URL']
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Event: " + str(event))
    # Read message posted on SNS Topic
    message = json.loads(event['Records'][0]['Sns']['Message'])

    logger.info("Message: " + str(message))
    # Construct a slack message
    slack_message = {
        'text': "%s" % (message)
    }

    # Post message on SLACK_WEBHOOK_URL
    req = Request(SLACK_WEBHOOK_URL, json.dumps(slack_message))
    try:
        response = urlopen(req)
        response.read()
        logger.info("Message posted to %s", slack_message['channel'])
    except HTTPError as e:
        logger.error("Request failed: %d %s", e.code, e.reason)
    except URLError as e:
        logger.error("Server connection failed: %s", e.reason)
```

*Add environment variables*

![blog-head-image](/images/doc/aws-codepipeline-blog-4.png)

## Slack

- Create Slack app

Step  | Details
------------- | -------------
1 | Go to `https://<your-team-domain>.slack.com/apps/manage`
2 | Search for `Incoming Webhooks` in Search App Directory searchbox, from the left side menu.
3 | Click on `Add Configuration`
4 | Select a desired channel where you want to post notifications/alerts e.g. aws-alerts
5 | Slack provides Webhook URL `https://hooks.slack.com/services/XXXXXXXX`
6 | You can customize `Name` & `Icons` as per your need

![blog-head-image](/images/doc/aws-codepipeline-blog-3.png)

## CloudWatch

> Amazon CloudWatch is a monitoring and management service that provides data and actionable insights for AWS.

With the name of the Pipeline, we can write cloudwatch event to capture any failure.

Step  | Details
------------- | -------------
1  | Go to `AWS Console -> Services -> CloudWatch -> Events -> Rules -> Create Rule`
2  | Select Service Name as `CodePipeline` & Event Type as `CodePipeline Pipeline Execution State Change`.
3  | Select radio button `Specific state(s)` & choose `FAILED` from the dropdown
4  | Click on Edit & update the json

![blog-head-image](/images/doc/aws-codepipeline-blog-2.png)

* Event Source

```json
{
  "source": [
    "aws.codepipeline"
  ],
  "detail-type": [
    "CodePipeline Pipeline Execution State Change"
  ],
  "detail": {
    "state": [
      "FAILED"
    ],
    "pipeline": [
      "build-ec2-service"
    ]
  }
}
```

Step  | Details
------------- | -------------
5  | For `Targets`, choose `Add target`.
6  | In the list of targets, choose `SNS topic`. For Topic, enter the above SNS Topic name you created `pipelines-failure-event`.
7  | Expand `Configure input`, and select `Input Transformer`.
8  | In the `Input Path` box, copy `{"pipeline":"$.detail.pipeline"}`. In the `Input Template` box, copy `

`":rotating_light:The Pipeline *<pipeline>* has failed.:man_shrugging:"`

Step  | Details
------------- | -------------
9  | Click `Configure Details`.
10  | Give name as `your-code-pipeline-failures` in our case `build-failure-for-ec2-service` & leave state as `Enabled`.
11 | Click `Create Rule`.

## Slack Alerts

We are all done. Whenever this pipeline fails our CloudWatch Events will capture it and pass it to SNS Topic,It will inturn invoke the lambda function and you will get a notification over slack channel.

![blog-head-image](/images/doc/aws-codepipeline-blog-5.png)

*Reference*

[Send Notification From AWS Code Pipeline to Slack](https://ritubhandaritechnicalside.wordpress.com/2017/09/28/get-notification-on-slack-from-code-pipeline/) for more details.

[AWS CodePipeline & Slack integration](https://medium.com/@krishnakuntala/aws-codepipeline-slack-integration-41dfaff2414e) for more details.

## Future Goal

- Convert the manual step to `CDK Deploy`, So we can reduce all the manual steps to add this awesome automation.

- Drive the `CDK Deployment` from `config.json` another `AWS CDK` menthod.

git config --global url."https://github.com/".insteadOf "https://github.com/"

git config --global url.https://github.com/.insteadOf git://github.com/

git config --global url."https://github.com/".insteadOf "https://$GITHUB_TOKEN@github.com/"