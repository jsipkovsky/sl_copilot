# sl copilot PoC
Chat with coder tutor via api


## Prerequisites

Clone the repository
```bash
git clone https://github.com/jsipkovsky/sl_copilot.git
```
Change directory to the project folder
```bash
cd sl_copilot
```
Install dependencies
```bash
npm install
```

## How to Develop (with Hot Reloading)

```bash
npm run dev
```

## How to use

Comunicate with assistant via api

POST http://localhost:8080/api/add-message

{
    "content": "how to print 'hi world' in python",
    "instructions": "Please address the user as Destroyer. The user has a premium account."
}
