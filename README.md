# MUST IGNORE .env file

# Make sure you prepare API for app

## Reference

```bash
https://nextjs.org/docs
Node: 16.18.0, npm: 8.19.2, Yarn: 1.22.19
```

## Code Style and Standards

```bash
https://github.com/airbnb/javascript
https://github.com/airbnb/javascript/tree/master/react
```

## Add package

```bash
`npm install <package>`
# for dev
`npm install <dev_package> --save-dev
```

## For develop

```bash
# 1. Change .env.example => .env
# 2. Run local API or change NEXT_PUBLIC_API_URI
# 3. Start app with dev
`npm install`
`npm run dev`
```

## For testing

```bash
#1. Run app first
`npm run dev`
```

## Process github

```bash
#1. Checkout branch develop and pull latest
`git checkout develop`
`git pull origin develop`
#2. Create new branch
`git checkout -b "<name>[<numberticket>]<title>"`
#3. Commit
`git commit -m "<type>[#<numberticket>] <Message>"`
type     | Mean
-------- | --------
feat     | Introduces a new feature to the codebase.
fix      | Patches a bug in your codebase.
docs     | Introduces changes to the documentation.
chore    | Introduces a small change of the tools, script no production code change.
test     | Usually adding missing tests, refactoring tests; no production code change.
style    | Usually using for format code no production code change.
refactor | Refactoring production code, eg. renaming a variable name of meet.
release  | Release the changes to production.
#4. Create PR + add teamate reivew (Michael, doanlecong, tina or tai)
```
