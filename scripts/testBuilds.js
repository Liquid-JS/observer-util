const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const distPath = path.resolve('dist')
const files = fs.readdirSync(distPath)

async function testBuilds () {
  for (let file of files) {
    const err = await execPromise(`BUNDLE=${file} npm run test`)
    if (err) {
      console.error('\x1b[31m', `Error in ${file}`, '\x1b[30m')
    } else {
      console.log(`${file} works as expected`)
    }
  }
}

function execPromise (cmd) {
  return new Promise(resolve => exec(cmd, resolve))
}

testBuilds()
