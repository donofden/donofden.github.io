---
layout: post
title: "Python Unittest datetime"
date: 2020-04-26
author: DonOfDen
tags: [python, mock, unittest, datetime, date, pytest]
description: Ways to mock datetime package functions in python unittest.
---

![blog-head-image](/images/doc/Python-Unittest-datetime-blog-1.png)

## Python Unittest Mock datetime

In Python, date, time and datetime classes provides a number of function to deal with dates, times and time intervals. Date and datetime are an object in Python, so when you manipulate them, you are actually manipulating objects and not string or timestamps. Whenever you manipulate dates or time, you need to import datetime function.

Consider the following python file, which has two methods `get_today_date()` & `get_date_time()` one returns the today date and other return today date with time now.

```python
from datetime import date, datetime

def get_today_date():
    return date.today()

def get_date_time():
    return datetime.now()
```

We need to consider few thing before writing unittest for the function.

- Our unittest should run at any given time/date.
- Our test should check the functionality.

What i mean in the above is that, if we dont mock the datetime, our unittest will fail the next day since the datetime has changed and we didnt mock the functions.

- There are many methods availabe but I feel [`freezegun`](https://github.com/spulec/freezegun/) is a awesome package. 

## Using freezegun package

FreezeGun is a library that allows your Python tests to travel through time by mocking the datetime module.

Once the decorator or context manager have been invoked, all calls to `datetime.datetime.now()`, `datetime.datetime.utcnow()`, `datetime.date.today()`, `time.time()`, `time.localtime()`, `time.gmtime()`, and `time.strftime()` will return the time that has been frozen.

When we use as a decorator using `mock`, it replaces the given function/class. But its need more code and maintanence. But with freeze we can define the vaule easily.

> Let your Python tests travel through time

Intall freezegun:

```cmd
pip install freezegun
```

My Unittest:

```python
from datetime import date, datetime
from freezegun import freeze_time


def get_today_date():
    return date.today()


def get_date_time():
    return datetime.now()


@freeze_time("2020-04-26")
def test_get_today_date():
    assert get_today_date() == date(2020, 4, 27)


@freeze_time("2020-04-26")
def test_get_date_time():
    assert get_date_time() == datetime(2020, 4, 27, 0, 0)
```

**Note:** *Works, but freezegun seems to be slow, especially if you have complicated logic with multiple calls for current time.*

Check [freezegun](https://github.com/spulec/freezegun/) for more information.

----------------------
Share your thoughts via twitter [`@aravind_kumar_g`](https://twitter.com/aravind_kumar_g) ``¯\_(ツ)_/¯``
