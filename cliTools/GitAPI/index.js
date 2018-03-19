const fs = require('fs');

class GitAPI {
  constructor(folder) {
    this.folder = folder;
  }

  getFiles() {
    const a = fs.readFile;
    console.log(this.folder);
  }
}

module.exports = GitAPI;
