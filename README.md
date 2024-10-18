# Credit Card Check

This repository is a template project for performing the stage 2 interview with back-end candidates.

## Implement

The following is an error check algorithm used for testing if a card number is valid. Given a card number:

1. From the last digit moving backwards, double every second digit.
2. If the doubled number is greater than 9, add it's two digits together.
3. Sum **_ALL_** card digits together (taking the value of step 2 for every second digit).
4. If the summed total's end digit is a zero, it is a valid card number.

## Test cases

There is a `index.test.ts` file, it has 3 tests that should pass at the end of the exercise. Implement tests for any new functions you create:

<div style="text-align: center;">
    <table>
        <th>
          Card Number
        </th>
        <th>
          Is Valid
        </th>
        <tr>
            <td>4242424242426742</td>
            <td>true</td>
        </tr>
        <tr>
            <td>1111111111111111</td>
            <td>false</td>
        </tr>
    </table>
</div>

## Reason

1. Explain how your implementation works
2. If you were given more time, how might you change your implementation to be better?

## REST Endpoint

There is a AWS Lambda function `card-function` in the project that uses Serverless Framework. To run this function use the command `pnpm start` any changes to the `serverless.yml` file will require a server restart.

## Return structure of `card-function` POST request

```
{
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: {
      "cardNumber": "4242424242426742",
      "isValid": true,
    }
  }
```

## Tasks

1. Add a new POST request to `card-function` that will receive a string as a query parameter
2. Validate the string is numeric
3. Do the credit card calculations and return the format above
4. Tests in `index.test.ts` should pass at the end of the exercise

### Explaining step one

<details>
Given the numbers 12345 then we need to double the numbers 4 and 2.<br/><br/>

5 skip<br/>
4 double<br/>
3 skip<br/>
2 double<br/>
1 skip

</details>

### Explaining step three

<details>
Given the numbers 12345 the total digits to sum would be 1 + 4 + 3 + 8 + 5.<br/><br/>

1 not doubled<br/>
4 is 2 doubled<br/>
3 not doubled<br/>
8 is 4 doubled<br/>
5 not doubled

</details>
