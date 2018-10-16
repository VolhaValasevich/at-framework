# sandisk-framework
test framework for www.sandisk.com

## Installation
```
npm i
```
During the installation it will create a "reports" directory and update webdriver-manager.

## Usage

### Run unit tests
```
npm run unit
```

### Run features
```
npm test
```
To run only selected features/scenarios, pass a string with tags as a command line argument. 
- All tags should begin with @ and be separated with commas.
- To exclude a tag, mark it with a ~ symbol.
```
npm test -- --tags "@main, @home, ~@header"
```

### Generate report
```
npm run report
```
This command will generate an html report based on report.json in "reports" directory. If there are several report jsons, they will be collected into one file fefore generating a report.
