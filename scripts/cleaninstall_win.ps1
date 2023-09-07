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