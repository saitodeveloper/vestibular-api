const { exec } = require('child_process')
const os = process.platform
const path = require('path')
const chossenEnv = process.argv[2]
const envRootPath = path.join(__dirname, '..', '.env')
const envFile = `.env.${chossenEnv}`
const targetFilePath = path.join(__dirname, envFile)

const chain = {
    darwin: {
        command: `cp ${targetFilePath} ${envRootPath}`
    },
    linux: {
        command: `cp ${targetFilePath} ${envRootPath}`
    },
    win32: {
        command: `TYPE "${targetFilePath}" > "${envRootPath}"`
    }
}

exec(chain[os].command, (err, stdout, _stderr) => {
    if (err) {
        return console.error(err)
    }
    console.log(stdout)
})
