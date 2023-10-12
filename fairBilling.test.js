// fairBilling.test.js

const { processLogFile } = require('./fairBilling');

// Capture console.log output
let capturedConsoleLog = '';
const originalLog = console.log;
console.log = (message) => {
  capturedConsoleLog += message + '\n';
};

test('Should produce the correct output', () => {
  const filePath = './logfile.txt';  // Adjust the path accordingly

  // Reset captured console log
  capturedConsoleLog = '';

  // Run the fairBilling process with the provided log file
  processLogFile(filePath);

  // Restore console.log
  console.log = originalLog;

  // Assuming the expected result is 'CHARLIE 3 37\nALICE99 4 240'
  const expectedOutput = 'CHARLIE 3 37\nALICE99 4 240';

  // Retrieve the actual output
  const result = capturedConsoleLog.trim();  // Trim any leading or trailing whitespace

  expect(result).toEqual(expectedOutput);
});
