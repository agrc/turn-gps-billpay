if (Test-Path ./package-lock.json) {
    Remove-Item ./package-lock.json -Force -ErrorAction SilentlyContinue
    "Removing ./package-lock.json"
}

if (Test-Path ./node_modules) {
    Remove-Item ./node_modules -Recurse -Force -ErrorAction Continue
    "Removing ./node_modules"
}

"Begin npm install"
npm install
"End npm install"

if (Test-Path ../function/package-lock.json) {
    Remove-Item ../function/package-lock.json -Force -ErrorAction Ignore
    "Removing ../function/package-lock.json"
}

if (Test-Path ../function/node_modules) {
    Remove-Item ../function/node_modules -Recurse -Force -ErrorAction Ignore
    "Removing ../function/node_modules"
}

cd ../function
"cd ../function"
"Begin npm install"
npm install
"End npm install"