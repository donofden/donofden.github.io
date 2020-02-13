---
layout: post
title: "Python Unittest: Testing Input(), Print() and exclude main() from coverage"
date: 2020-02-13
author: DonOfDen
tags: [Python, unittest, exclude, coverage]
description: How to Unittest Input(), Print() and exclude main() from coverage.
---

## Python Unittest

"Testing", in general programming terms, is the practice of writing code (separate from your actual application code) that invokes the code it tests to help determine if there are any errors. It does not prove that code is correct (which is only possible under very restricted circumstances). It merely reports if the conditions the tester thought of are handled correctly.

In this blog we discuss few methods used to handle/cover input(), print() functions.

## Testing print()

```python
from nose.tools import *
from unittest import mock
from unittest.mock import patch
import io

def foo():
    print("Something")

# Solution one: testing print with @patch
@patch('sys.stdout', new_callable=io.StringIO)
def test_foo_one(mock_stdout):
    foo()
    assert mock_stdout.getvalue() == 'Something\n'

# Solution two: testing print with with-statement
def test_foo_two():
    with mock.patch('sys.stdout', new=io.StringIO()) as fake_stdout:
        foo()

    assert fake_stdout.getvalue() == 'Something\n'

# Solution three: testing print with with-statement
# and assert_has_calls
def test_foo_three():
    with mock.patch('sys.stdout') as fake_stdout:
        foo()

    fake_stdout.assert_has_calls([
        mock.call.write('Something'),
        mock.call.write('\n')
    ])
```

## Testing input()

```python
from nose.tools import *
from unittest import mock

def bar():
    ans = input("enter yes or no")
    if ans == "yes":
        return "you entered yes"
    if ans == "no":
        return "you entered no"


def test_bar_yes():
    original_input = mock.builtins.input
    mock.builtins.input = lambda _: "yes"
    assert_equal(bar(), "you entered yes")
    mock.builtins.input = original_input

def test_bar_no():
    original_input = mock.builtins.input
    mock.builtins.input = lambda _: "no"
    assert_equal(bar(), "you entered no")
    mock.builtins.input = original_input
```

## Some usefull ressources

Interesting one.. [Python Mocking 101: Fake It Before You Make It](https://www.fugue.co/blog/2016-02-11-python-mocking-101){:target="_blank"}

[What is the purpose of mock objects?](https://stackoverflow.com/questions/3622455/what-is-the-purpose-of-mock-objects#3623574){:target="_blank"}

[Python mocking raw input in unittests](https://stackoverflow.com/questions/21046717/python-mocking-raw-input-in-unittests){:target="_blank"}

[Unit Testing for user input and expected output in Python](https://stackoverflow.com/questions/32488280/unit-testing-for-user-input-and-expected-output-in-python){:target="_blank"}

[How to Mock a user input in Python](https://stackoverflow.com/questions/46222661/how-to-mock-a-user-input-in-python){:target="_blank"}

[Python Mocks: a gentle introduction](http://blog.thedigitalcatonline.com/blog/2016/09/27/python-mocks-a-gentle-introduction-part-2/){:target="_blank"}

[Python unit test for nested if statement](https://stackoverflow.com/questions/25677260/python-unit-test-for-nested-if-statement#25677484){:target="_blank"}

[How to unit test an if-else statement in C# using just a stubclass?](https://stackoverflow.com/questions/15391504/how-to-unit-test-an-if-else-statement-in-c-sharp-using-just-a-stubclass){:target="_blank"}

[Using unittest.mock to patch input() in Python 3](https://stackoverflow.com/questions/18161330/using-unittest-mock-to-patch-input-in-python-3){:target="_blank"}

[Mock Python's built in print function](https://stackoverflow.com/questions/12998908/is-it-possible-to-mock-pythons-built-in-print-function){:target="_blank"}

## How to exclude “if __name__ == '__main__'” contents

if `__name__ == '__main__'` from the coverage report , of course you can do that only if you already have a test case for your `main()` function in your tests.

As for why I choose to exclude rather than writing a new test case for the whole script is because if as I stated you already have a test case for your `main()` function the fact that you add an other test case for the script (just for having a 100 % coverage) will be just a duplicated one.

```python
def main():
    pass

if __name__ == "__main__":
    main()
```

For how to exclude the if `__name__ == '__main__'` you can write a coverage configuration file and add in the section report:

```config
[report]

exclude_lines =
    if __name__ == .__main__.:
```

The default name for configuration files is `.coveragerc`, in the same directory coverage.py is being run in.

More info about the coverage configuration file can be found [here](https://coverage.readthedocs.io/en/latest/config.html){:target="_blank"}


----------------------
Please refer [Galactic](https://github.com/donofden/galactic){:target="_blank"} one of my project where I learnt how to implement the above.

Share your thoughts via twitter @aravind_kumar_g ``¯\_(ツ)_/¯``