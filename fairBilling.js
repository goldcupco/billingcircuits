const fs = require('fs');

class SessionTracker {
  constructor() {
    this.sessions = {};
    this.stack = [];
    this.lastTimestamp = 0;
  }

  processRecord(record) {
    const [timestamp, user, action] = record.split(' ');

    if (this.isValidRecord(timestamp, user, action)) {
      const timeInSec = this.getTimeInSeconds(timestamp);

      if (action === 'Start') {
        this.stack.push({ user, start: timeInSec });
      } else if (action === 'End') {
        if (this.stack.length > 0) {
          const { user: startUser, start } = this.stack.pop();
          const endUser = user || startUser;
          const end = timeInSec;
          this.sessions[endUser] = this.sessions[endUser] || [];
          this.sessions[endUser].push({ start, end });
        } else {
          const endUser = user || 'UNKNOWN';
          const end = timeInSec;
          this.sessions[endUser] = this.sessions[endUser] || [];
          this.sessions[endUser].push({ start: this.lastTimestamp, end });
        }
      }

      this.lastTimestamp = timeInSec;
    }
  }

  isValidRecord(timestamp, user, action) {
    return (
      typeof timestamp === 'string' &&
      typeof user === 'string' &&
      typeof action === 'string' &&
      (action === 'Start' || action === 'End')
    );
  }

  getTimeInSeconds(timestamp) {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  calculateSessionDurations() {
    const results = [];
    for (const user in this.sessions) {
      const sessions = this.sessions[user];
      let totalDuration = 0;
      let activeSessions = 0;

      sessions.forEach(session => {
        totalDuration += Math.max(0, Math.min(session.end, this.lastTimestamp) - Math.max(session.start, 0));
        if (session.end === 0) {
          activeSessions++;
        }
      });

      results.push({ user, sessions: sessions.length + activeSessions, totalDuration });
    }
    return results;
  }
}

function processLogFile(filePath) {
  const sessionTracker = new SessionTracker();
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const records = fileContent.split('\n');

  records.forEach(record => sessionTracker.processRecord(record));

  sessionTracker.stack.forEach(({ user, start }) => {
    const endUser = user || 'UNKNOWN';
    const end = sessionTracker.lastTimestamp;
    sessionTracker.sessions[endUser] = sessionTracker.sessions[endUser] || [];
    sessionTracker.sessions[endUser].push({ start, end });
  });

  const results = sessionTracker.calculateSessionDurations();

  results.forEach(result => {
    console.log(`${result.user} ${result.sessions} ${result.totalDuration}`);
  });
}

// Check if a file path is provided as a command line argument
const filePath = process.argv[2];

if (filePath) {
  processLogFile(filePath);
} 

module.exports = { processLogFile };
