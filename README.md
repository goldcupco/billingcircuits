# billingcircuits



Contents :
1. Summary , Issues and Recommendations
2. Requirement 
3. Language used
4. Expected output 
5. Actual output
6. Run Instructions
7. Testing 
8. Installation
   

 Summary , Issues and Recommendations:
   
This program is written to show the number of calls and total duration by customer on a small sample text file of data.

1.Currently 75% of the actual output has the correct figures. 

2.However an issue exists with the ALICE99 duration total; with more time this could have been perfected.

3.The suggested improvement in managing this type of Telco oriented circuit billing problem is to use a low cost database language.

4.Postgres would be an ideal low cost solution for the backend calculation.

5.This program could then be simply be reduced to a REST API to engineer a solution that can be more easily maintained and upgraded moving forward.


 Requirement : see the pdf document


 Language used :

 Node.js v18.4.0


 Expected output :

ALICE99 4 240
CHARLIE 3 37

 Actual output :
 
node fairBilling.js ./logfile.txt

gives 

CHARLIE 3 37
ALICE99 4 116

6. Run Instructions :

node fairBilling.js ./logfile.txt

7. Testing : ( using jest)

npm test          

gives :

> bttest3@1.0.0 test
> jest

 FAIL  ./fairBilling.test.js
  ✕ Should produce the correct output (7 ms)

  ● Should produce the correct output

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      CHARLIE 3 37
    - ALICE99 4 240
    + ALICE99 4 116

      28 |   const result = capturedConsoleLog.trim();  // Trim any leading or trailing whitespace
      29 |
    > 30 |   expect(result).toEqual(expectedOutput);
         |                  ^
      31 | });
      32 |

      at Object.toEqual (fairBilling.test.js:30:18)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.636 s, estimated 1 s


 Installation :


Set up the default package.json using 
  
  npm init -y 

then install the code using

npm install













