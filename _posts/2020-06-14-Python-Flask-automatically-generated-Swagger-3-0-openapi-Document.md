---
layout: post
title: "Python Flask automatically generated Swagger 3.0/Openapi Document"
date: 2020-06-14
author: DonOfDen
tags: [python, flask, swagger, swagger3.0, openapi, document]
description: Python Flask automatically generated Swagger 3.0/Openapi Document
---

## Python Flask automatically generated Swagger 3.0/Openapi Document

This article is the second part of [`Python Flask automatically generated Swagger 2.0 Document`](http://donofden.com/blog/2020/05/30/Python-Flask-automatically-generated-Swagger-2-0-Document), in this article we are going to generate `Swagger 3.0/Openapi Document`.

In the wild, they are many good examples of well-documented APIs... Take the Twitter API : the docs are great, user-friendly and cover all the available endpoint with tips and examples. Any fresh CS student could write a small Python tool using it, just by following the documentation and its examples.

we decided to follow the OpenAPI (aka Swagger 3.0) specification to build a solid documentation for our Flask-powered micro-services APIs. Let's dive in.

## APISPEC

Thanks to the [apispec](https://apispec.readthedocs.io/en/latest/install.html) lib, you can automagically generate a specification file (commonly named swagger.json) form your Flask code. Some other libraries can do a lot of magic for you, but apispec is really simple to use and can sit next to your code without interfering with it.

It supports [Marshmallow and Flask](https://apispec.readthedocs.io/en/latest/using_plugins.html), allowing you to re-use your code to generate a proper documentation!

**Prerequisites**

You will need to have Python installed on your machine.

I would recommend using Python 3, but Python 2 should work just fine.

To install flask:

```cmd
pip install flask
```

To install apispec:

```cmd
pip install -U apispec
```

To install with YAML support:

```cmd
pip install -U 'apispec[yaml]'
```

Let's write our generation script, e.g. `openapi.py`:

```python
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from marshmallow import Schema, fields
from flask import Flask, abort, request, make_response, jsonify
from pprint import pprint
import json


class DemoParameter(Schema):
    gist_id = fields.Int()


class DemoSchema(Schema):
    id = fields.Int()
    content = fields.Str()


spec = APISpec(
    title="Demo API",
    version="1.0.0",
    openapi_version="3.0.2",
    info=dict(
        description="Demo API",
        version="1.0.0-oas3",
        contact=dict(
            email="admin@donofden.com"
            ), 
        license=dict(
            name="Apache 2.0",
            url='http://www.apache.org/licenses/LICENSE-2.0.html'
            )
        ),
    servers=[
        dict(
            description="Test server",
            url="https://resources.donofden.com"
            )
        ],
    tags=[
        dict(
            name="Demo",
            description="Endpoints related to Demo"
            )
        ],
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)

spec.components.schema("Demo", schema=DemoSchema)

# Extensions initialization
# =========================
app = Flask(__name__)


@app.route("/demo/<gist_id>", methods=["GET"])
def my_route(gist_id):
    """Gist detail view.
    ---
    get:
      parameters:
      - in: path
        schema: DemoParameter
      responses:
        200:
          content:
            application/json:
              schema: DemoSchema
        201:
          content:
            application/json:
              schema: DemoSchema
    """
    # (...)
    return jsonify('foo')


# Since path inspects the view and its route,
# we need to be in a Flask request context
with app.test_request_context():
    spec.path(view=my_route)
# We're good to go! Save this to a file for now.
with open('swagger.json', 'w') as f:
    json.dump(spec.to_dict(), f)

pprint(spec.to_dict())
print(spec.to_yaml())
```

- Here, we first create a new APISpec instance with some details about our API.
- Then, we add our definitions (here, we are using Marshmallow to define how our API will serialize/deserialize data) with `spec.components.schema` or using `APISpec.definition()`.
- Finally, we add our routes to our API specification using `app.test_request_context()` and `APISpec.add_path()`. `apispec` will parse your route functions docstrings, so make sure your add some OpenAPI YaML stuff here, as in :

```python
@app.route("/demo/<gist_id>", methods=["GET"])
def my_route(gist_id):
    """Gist detail view.
    ---
    get:
      parameters:
      - in: path
        schema: DemoParameter
      responses:
        200:
          content:
            application/json:
              schema: DemoSchema
        201:
          content:
            application/json:
              schema: DemoSchema
    """
    # (...)
    return jsonify('foo')
```

You will end up with a valid JSON API specification.

`swagger.json`

```json
{
	"info": {
		"description": "Demo API",
		"version": "1.0.0-oas3",
		"contact": {
			"email": "admin@donofden.com"
		},
		"license": {
			"name": "Apache 2.0",
			"url": "http://www.apache.org/licenses/LICENSE-2.0.html"
		},
		"title": "Demo API"
	},
	"servers": [{
		"description": "Test server",
		"url": "https://resources.donofden.com"
	}],
	"tags": [{
		"name": "Demo",
		"description": "Endpoints related to Demo"
	}],
	"paths": {
		"/demo/{gist_id}": {
			"get": {
				"parameters": [{
					"in": "path",
					"name": "gist_id",
					"required": true,
					"schema": {
						"type": "integer",
						"format": "int32"
					}
				}],
				"responses": {
					"200": {
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Demo"
								}
							}
						}
					},
					"201": {
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/Demo"
								}
							}
						}
					}
				}
			}
		}
	},
	"openapi": "3.0.2",
	"components": {
		"schemas": {
			"Demo": {
				"type": "object",
				"properties": {
					"id": {
						"type": "integer",
						"format": "int32"
					},
					"content": {
						"type": "string"
					}
				}
			}
		}
	}
}
```

```yaml
components:
  schemas:
    Demo:
      properties:
        content:
          type: string
        id:
          format: int32
          type: integer
      type: object
info:
  contact:
    email: admin@donofden.com
  description: Demo API
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  title: Demo API
  version: 1.0.0-oas3
openapi: 3.0.2
paths:
  /demo/{gist_id}:
    get:
      parameters:
      - in: path
        name: gist_id
        required: true
        schema:
          format: int32
          type: integer
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Demo'
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Demo'
servers:
- description: Test server
  url: https://resources.donofden.com
tags:
- description: Endpoints related to Demo
  name: Demo
```

Last few breaths:

The `OpenAPI` offers many options I didn't cover here for simplification. You can many details about the parameters and responses of your routes, provide example in your routes functions docstring that will be parsed and added to your spec. Look for more details [here](https://apispec.readthedocs.io/en/latest/special_topics.html)

----------------------
Share your thoughts via twitter [`@aravind_kumar_g`](https://twitter.com/aravind_kumar_g) ``¯\_(ツ)_/¯``
