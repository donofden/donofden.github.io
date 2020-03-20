---
layout: post
title: "Python Pytest for AWS Lambdas and Dynamodb"
date: 2020-03-20
author: DonOfDen
tags: [Pytest, Python, unittest, exclude, coverage]
description: How to use Pytest for AWS Lambdas and Dynamodb.
---

## Python Unittest

In this article I'll show you the techniques which I have incorporated into my test suites using Pytest.

I’ve had the chance to use Lambda functions in my recent work, With a low cost of getting started, Lambda has been useful for building small programms which can do a quick set of tasks. Since i know a bit of python i could achive my tasks but unfortunaltely i have no idea about automated testing with lambda with AWS recources.

 I wanted to find a way to test Lambda functions while developing them - preferably, in a test environment that would not make live calls to AWS, and allow me to test the behaviour of a given function at a high level.

 In researching to this i found some articals which provided some information of using `pytest` with `moto`. Moto’s approach is to mock out AWS services entirely, in a stateful way. Your code still can make calls to create and alter resources, and it will appear as though these changes are actually being made. However, this is all happening in moto’s mocked services, not on AWS directly.

## Task

 > To write a lambda wwhich will be triggered by a API gateway, with according to the request our lambda will server the record status from dynamodb.

Lets start writing our lambda, I always prefer mutliple functions/chuncks of code then a long list of line, since chunks can be esaily test and reusable. so im going to split the function in to two functions.

 - `lambda_handler` - This is the handler for the lambda.
 - `get_record_status` - The function to check dynamodb tables.

### lambda_handler

```python
 def lambda_handler(event, context):
    """
    This lambda function will check the provided record status in dynamodb and respond with the status message
    :param event: record_id
    :param context:
    :return: JSON of statusCode, body, error
    """
    try:
        record_id = event['record_id']
        record_type = "global"
        record = get_record_status(DbEntity(record_id, record_type))
        result = ResultEntity(**record)

        return {
            'statusCode': 200,
            'body': json.dumps(result, default=lambda o: o.__dict__)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'error': str(e)
        }
```

If you see the above code we take the `event` value which holds the requested `record_id` (`PARTITION_KEY`) to fetch the status. The `record_type` is a `SORT_KEY` of dynamodb which additionally we use to retriev our record details. Please check dynamodb doc for `SORT_KEY` (since i felt difficult to use the `mock` for it, I thought its will be helpful to other tp show how we can use it.)

`DbEntity` is a class which I use as a entity class for my DynamoDB fucntion.

```python
class DbEntity:
    def __init__(self, record_id, record_type):
        """
        This function used to initiate values to the class variables
        """
        self.RecordId = record_id
        self.RecordType = record_type
```

- `RecordId` & `RecordType` represents my field names in dynamodb.

`ResultEntity` is a class which I use as a entity class for my return response.

```python
class ResultEntity:
        def __init__(self, RecordId, Status, Notes=None):
        """
        This function used to initiate values to the class variables
        """
        self.RecordId = RecordId
        self.Status = Status
        # Only return other values when status is `OK`
        if Status == "OK":
            self.Notes = Notes
```

- `RecordId`,`Status` & `Notes` represents my field which i fetch from dynamodb. Also if you look here I return `Notes` only when my status is `OK`. (Intead of using `"OK"` in if condition, you can assign the value to a CONSTANT and validated it in the condition. Just saying...)

### `get_record_status`

Well here comes the tricky part we all are waiting. Lets jump in to the code first then will explain what is does.

```python
def get_record_status(item):
    """
    This function will check the entry in dynamodb if exist will return the status of the entry
    :param instance_item: RecordId, RecordType
    :return: status of the given RecordId or return NoRecordError Exception
    """
    table = DYNAMO_DB.Table(TABLE_NAME)

    base_instance_item = table.get_item(
        Key={
            'RecordId': item.RecordId,
            'RowType': item.RowType
        },
        ProjectionExpression='RecordId, RowType, #s',
        ExpressionAttributeNames={
            "#s": "Status"
        },
        ConsistentRead=True)

    if "Item" not in base_instance_item:
        raise NoRecordError("No Records Found.")
    else:
        return base_instance_item['Item']
```

If you look at the code, im accessing the table and submiting a request using `get_item` built in function of dynamodb with appropriate details. The `DYNAMO_DB` is a global vaiable here will explain it further in next section. So here im defining my `PARTITION_KEY` and `SORT_KEY` in `Key` section. If you didnt use `SORT_KEY` feel free to remove it.

In `ProjectionExpression` we select the field we need from table. `TABLE_NAME` is a global variable used in this lambda.

Ok, lets see what are the other chunks I used to manage this lambda to work like `NoRecordError` Exception handler and `DYNAMO_DB` global variable.

A simple and basic Exception handler:

```python
class Error(Exception):
    """Base class for other exceptions"""
    pass


class NoRecordError(Error):
    """Raised when no record found"""
    pass
```

Setting up my dynamodb client for development envirnment so we can test our lambda fromlocal envirnment rather than runnign in aws.

Make sure u set `TableName` and `STAGE`in ur env variables.

```python
TABLE_NAME = os.environ['TableName']
# Get the environment, so we can run appropriate scripts
IS_DEVELOPMENT = os.environ['STAGE'] == 'DEVELOPMENT'

def get_dynamo_db_client():
    """ Set the dynamodb instance based on environment"""
    if IS_DEVELOPMENT:
        # Set the boto3 session for dynamodb if its development environment
        dynamo_db_session = boto3.Session(profile_name="default")
        return dynamo_db_session.resource('dynamodb')
    else:
        return boto3.resource("dynamodb")

DYNAMO_DB = get_dynamo_db_client()
```

With this we succesfully created a lambda. To test run place the script in the lambda file and execute.

```python
event = {"RecordId":"008"}
context = ""
result = lambda_handler(event, context)

json.dumps(result, default=lambda o: o.__dict__)
```
At this point, If you have a record in dynamodb the result should be the following.

```json
{
    'statusCode': 200,
    'body': {
        'RecordId': '008',
        'Status': 'OK',
        'Notes':'This is DonOfDen Blog!'
    }
}
```
