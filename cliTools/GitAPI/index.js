const fs = require('fs');

class GitAPI {
  constructor(folder) {
    this.folder = folder;
  }

  getFiles() {
    console.log(this);
  }
}

module.exports = GitAPI;
