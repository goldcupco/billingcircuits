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


 Requirement :

Fair billing 
You work for a hosted application provider which charges for the use of its application by the duration of sessions. There is a charge
per second of usage. The usage data comes from a log file that lists the time at which a session starts or stops (in the format
HH:MM:SS), the name of the user (which is a single alphanumeric string, of arbitrary length) and whether this is the start or end of
the session, like this:
14:02:03 ALICE99 Start
14:02:05 CHARLIE End
14:02:34 ALICE99 End
14:02:58 ALICE99 Start
14:03:02 CHARLIE Start
14:03:33 ALICE99 Start
14:03:35 ALICE99 End
14:03:37 CHARLIE End
14:04:05 ALICE99 End
14:04:23 ALICE99 End
14:04:41 CHARLIE Start
Unfortunately, the developer of the application omitted some vital information from the log file. There is no indicator which start and
end lines are paired together. Even more unfortunately, the log files are re-written on a regular basis, so sessions may overlap the time
boundaries of the log file. In other words, there may be “End” entries for sessions that were already in progress when the log file
started, which will have no preceding “Start”. Similarly, when the log files are retrieved, there may be sessions still in progress that
have a “Start” but no “End”.
Your task is to take the log file and to print out a report of the users, the number of sessions, and the minimum possible total
duration of their sessions in seconds that is consistent with the data in the file. As you can see in the example above, a user can also
have more than one session active concurrently. Where there is an “End” with no possible matching start, the start time should be
assumed to be the earliest time of any record in the file. Where there is a “Start” with no possible matching “End”, the end time
should be assumed to be the latest time of any record in the file. So, for a file containing only these records:
14:02:03 ALICE99 Start
14:02:05 CHARLIE End
14:02:34 ALICE99 End
the start time for CHARLIE's record should be assumed to be the earliest time in the file, i.e. 14:02:03. Similarly for the first example
above:
...
14:04:05 ALICE99 End
14:04:23 ALICE99 End
14:04:41 CHARLIE Start
the last record is a “Start” and there are no later records at all so CHARLIE's last session will be considered to have finished at
14:04:41, i.e. it will be 0 seconds in duration.
Putting this all together, the results for the original data shown above would be as follows (name, sessions and total time):
ALICE99 4 240
CHARLIE 3 37
Your program should take a single command line parameter, which will be the path to the data file to read. You can assume that the
data in the input will be correctly ordered chronologically, and that all records in the file will be from within a single day (i.e. they will
not span midnight).
Finally, you should note that, as with most log files, there may be other invalid or irrelevant data within the file. Therefore, any lines
that do not contain a valid time-stamp, username and a Start or End marker should be silently ignored and not included in any
calculations.



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













