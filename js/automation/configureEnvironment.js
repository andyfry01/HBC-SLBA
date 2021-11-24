const fs = require('fs')
const path = require('path')
const readline = require('readline')

const newEnvironment = process.argv[2]
let oldEnvironment = undefined

let newEnvironmentRegex = undefined
let oldEnvironmentRegex = undefined

const domainRegex = {
  production: /https:\/\/hbc-slba\.com/g,
  local: /http:\/\/localhost:5000/g
}

const domains = {
  production: 'https://www.hbc-slba.com',
  local: 'https://www.hbc-slba.com'
}

// set old domain to replace and new domain to replace it with
for (let domain in domains) {
  if (domains.hasOwnProperty(domain)) {
    if (domains[domain] === newEnvironment) {
      if (domain === 'local') {
        newEnvironmentRegex = domainRegex.local
        oldEnvironmentRegex = domainRegex.production
        oldEnvironment = domainRegex.production
      }
      if (domain === 'production') {
        newEnvironmentRegex = domainRegex.local
        oldEnvironmentRegex = domainRegex.production
        oldEnvironment = domainRegex.production
      }
    }
  }
}


// const projectRoot = path.resolve('pages', 'boilerplate_folder')
const projectRoot = '.'

const ignoreList = [
  'node_modules',
  'images',
  'css',
  'js',
  '.DS_Store',
  '.git'
]

console.log('........ 🍰 🚀 🎸 💥 ..........')
console.log(`configuring website for ${environment}`);
console.log('........ 🍰 🚀 🎸 💥 ..........')

go()





/* 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 */
/*  ☠️ ⚓️ Here be functions mateys ⚓️ ☠️  */
/* 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 🌊 */

function go(){
  readDirectory(projectRoot)
}

function readDirectory(directoryPath){
  fs.readdir(directoryPath, (err, directoryContents) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log('directoryContents');
    console.log(directoryContents);
    directoryContents.forEach(itemInDirectory => {
      checkIfDirectory(directoryPath, itemInDirectory)
    })
  })
}

function checkIfDirectory(projectPath, itemInDirectory) {
  let pathToFile = path.resolve(projectPath, itemInDirectory)
  fs.lstat(pathToFile, (err, stats) => {
    if (stats.isFile()) {
      if (pathToFile.match(/.*(\.html)/)) {
        // console.log(`${pathToFile} is an html itemInDirectory`)
        findAndReplaceURLs(pathToFile)
      }
    }
    if (stats.isDirectory()) {
      if (ignoreList.indexOf(itemInDirectory) < 0) {
        readDirectory(pathToFile)
      }
    }
  })
}

function findAndReplaceURLs(file){
  console.log(`configuring ${file}`);
  let configuredFile = ''
  let fileReader = fs.createReadStream(file, 'utf8')
  fileReader.on('data', (line) => {
    if (line.match(domainRegex.productionDomain)) {
      configuredFile += line.replace(domainRegex.productionDomain, domains.localDomain)
    } else {
      configuredFile += line
    }
  })
  fileReader.on('end', () => {
    fs.writeFile(file, configuredFile, (err) => {
      if (err) {
        console.log(err);
        return false
      }
      console.log('ding!');
    })
  })
}
