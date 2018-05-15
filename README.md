# How to use
1. Install mongodb
2. Prepare data for mongodb
```
mongorestore --db company_list data/company_list
```
3. Run server up
```
cd server
yarn
npm start
```
4. Run web up
```
cd web
yarn
npm start
```

*Note*
- To commit
```
git commit -m "add readme" --no-verify
```