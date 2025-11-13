if (Test-Path ./package-lock.json) {
    Remove-Item ./package-lock.json -Force -ErrorAction SilentlyContinue
    "Removing ./package-lock.json"
}

if (Test-Path ./node_modules) {
    Remove-Item ./node_modules -Recurse -Force -ErrorAction Continue
    "Removing ./node_modules"
}

"Begin npm install"
pnpm install
"End npm install"

if (Test-Path ../functions/package-lock.json) {
    Remove-Item ../functions/package-lock.json -Force -ErrorAction Ignore
    "Removing ../functions/package-lock.json"
}

if (Test-Path ../functions/node_modules) {
    Remove-Item ../functions/node_modules -Recurse -Force -ErrorAction Ignore
    "Removing ../functions/node_modules"
}

cd ../functions
"cd ../functions"
"Begin npm install"
pnpm install
"End npm install"
