const fs = require('fs');
const { spawn } = require('child_process');

class GitAPI {
  constructor(folder) {
    this.folder = folder;
  }

  async getBranches() {
    const bashText = 'git branch';
    const branchesData = await this.executeCliCommand(bashText);
    if (!branchesData.errors.length) {
      branchesData.body = GitAPI.parseBranches(branchesData.body); 
    }
    return branchesData;
  }

  async checkoutBranch(branchName) {
    const bashText = `git checkout ${branchName}`;
    const checkoutResult = await this.executeCliCommand(bashText);
    if (!checkoutResult.errors.length) {
      return checkoutResult;
    }
    else {
      throw new Error(checkoutResult.errors);
    }
  }

  executeCliCommand(bashText) {
    let commandWords = bashText.split(' ');
    let [ command, ...keys ] = commandWords;
    const executing = spawn(command, keys);
    return new Promise((resolve, reject) => {
      const result = {
        errors: [],
        body: [],
      };
      executing.stdout.on('data', (data) => {
        result.body.push(data);
      });
      executing.stderr.on('data', (data) => {
        result.errors.push(data);
      });
      executing.on('close', (code) => {
        if (result.body) {
          // конвертируем unit8Array в stringArray
          result.body = result.body.toString().split('\n');
          result.body = result.body.filter(s => s !== '');
        }
        resolve(result);
      });
    });
  }

  static parseBranches(branches) {
    const reg = /^\* .+/; // звездочка, затем пробел, затем любые символы
    return branches.map((branch) => {
      let newBranch = branch;
      if (reg.test(branch)) {
        newBranch = branch.slice(1, branch.length); // обрезаем звездочку
      }
      return newBranch.trim();
    });
  }
}

module.exports = GitAPI;
