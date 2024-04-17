---
layout: post
title: "How to Validate JSON Schema using Python"
date: 2020-03-15
author: DonOfDen
tags: [Python, JSON, schema, validation]
description: This blog post will help you understand JSON Schema validation in Python, which uses `Jsonschema` the most complete and compliant JSON Schema validator.
---

# python-validate-json-schema

This blog post will help you understand JSON Schema validation in Python, which uses `Jsonschema` the most complete and compliant JSON Schema validator.

GITHUB Project: [python-validate-json-schema](https://github.com/donofden/python-validate-json-schema){:target="_blank"}

## JSON Schema

JSON Schema is a specification for JSON based format for defining the structure of JSON data. It was written under IETF draft which expired in 2011. JSON Schema.

- Describes your existing data format.
- Clear, human- and machine-readable documentation.
- Complete structural validation, useful for automated testing.
- Complete structural validation, validating client-submitted data.

Currently the most complete and compliant JSON Schema validator available for python is `Jsonschema`.

Given below is a basic JSON schema, which covers a basic user details.


```json
{
   "$schema":"http://json-schema.org/draft-04/schema#",
   "title":"User",
   "description":"A user request json",
   "type":"object",
   "properties":{
      "id":{
         "description":"The unique identifier for a user",
         "type":"integer"
      },
      "name":{
         "description":"Name of the user",
         "type":"string"
      },
      "contact_number":{
         "type":"number"
      }
   },
   "required":[
      "id",
      "name",
      "contact_number"
   ]
}
```

`jsonschema` is an implementation of [JSON Schema](https://json-schema.org/){:target="_blank"} for Python. Using `jsonschema`, we can create a schema of our choice, so every time we can validate the JSON document against this schema, if it passed, we could say that the JSON document is valid.

Keyword | Description |
--- | --- |
$schema | The $schema keyword states that this schema is written according to the draft v4 specification. |
title | You will use this to give a title to your schema. |
description | A little description of the schema. |
type | The type keyword defines the first constraint on our JSON data: it has to be a JSON Object. |
properties | Defines various keys and their value types, minimum and maximum values to be used in JSON file. |
required | This keeps a list of required properties. |
minimum | This is the constraint to be put on the value and represents minimum acceptable value. |
exclusiveMinimum | If "exclusiveMinimum" is present and has boolean value true, the instance is valid if it is strictly greater than the value of "minimum". |
maximum | This is the constraint to be put on the value and represents maximum acceptable value. |
exclusiveMaximum | If "exclusiveMaximum" is present and has boolean value true, the instance is valid if it is strictly lower than the value of "maximum". |
multipleOf | A numeric instance is valid against "multipleOf" if the result of the division of the instance by this keyword's value is an integer. |
maxLength | The length of a string instance is defined as the maximum number of its characters. |
minLength | The length of a string instance is defined as the minimum number of its characters. |
pattern | A string instance is considered valid if the regular expression matches the instance successfully. |

You can check a [http://json-schema.org](http://json-schema.org){:target="_blank"} for the complete list of keywords that can be used in defining a JSON schema. The above schema can be used to test the validity of the following JSON code 

First, install `jsonschema` using pip command.

```pip
pip install jsonschema
```

Python Script:

```python
import json
import jsonschema
from jsonschema import validate


def get_schema():
    """This function loads the given schema available"""
    with open('user_schema.json', 'r') as file:
        schema = json.load(file)
    return schema


def validate_json(json_data):
    """REF: https://json-schema.org/ """
    # Describe what kind of json you expect.
    execute_api_schema = get_schema()

    try:
        validate(instance=json_data, schema=execute_api_schema)
    except jsonschema.exceptions.ValidationError as err:
        print(err)
        err = "Given JSON data is InValid"
        return False, err

    message = "Given JSON data is Valid"
    return True, message


# Convert json to python object.
jsonData = json.loads('{"id" : "10","name": "DonOfDen","contact_number":1234567890}')

# validate it
is_valid, msg = validate_json(jsonData)
print(msg)
```

Input Json
```json
{"id" : 10,"name": "DonOfDen","contact_number":1234567890}
```

- We first convert the input JSON in to python object using `json.loads` then using `jsonschema` function `validate` we validate the given input with the JSON Schema provided.

If you try to run the above script, the output will be `Given JSON data is Valid`. 

## Testing with other type of input

Lets test with alternative json input, If you check th python script above The `validate()` method will raise an exception if given JSON is not what is described in the schema.

```json
{"id" : "10","name": "DonOfDen","contact_number":1234567890}
```
In the above input json we have modified `"id" : 10` from integer to `"id" : "10"` string.

```txt
'10' is not of type 'integer'

Failed validating 'type' in schema['properties']['id']:
    {'description': 'The unique identifier for a user', 'type': 'integer'}

On instance['id']:
    '10'
Given JSON data is InValid

```

### Reference:

- [https://json-schema.org/](https://json-schema.org/){:target="_blank"}
- [https://pynative.com/python-json-validation/](https://pynative.com/python-json-validation/){:target="_blank"}
- [https://www.tutorialspoint.com/json/json_schema.htm](https://www.tutorialspoint.com/json/json_schema.htm){:target="_blank"}
- [https://github.com/Julian/jsonschema](https://github.com/Julian/jsonschema){:target="_blank"}
- [https://extendsclass.com/json-schema-validator.html](https://extendsclass.com/json-schema-validator.html){:target="_blank"}

----------------------
Please refer [python-validate-json-schema](https://github.com/donofden/python-validate-json-schema){:target="_blank"} one of my project where I learnt how to implement the above.

Share your thoughts via twitter [@aravind_kumar_g](https://twitter.com/aravind_kumar_g){:target="_blank"} ``¯\_(ツ)_/¯``
