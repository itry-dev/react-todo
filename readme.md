# A simple React Todo app
**This version uses json-server as an Api server**

A CRUD todo react app example.  
Can be installed as a docker app just run  
``` 
docker-compose up -d
```  
It will start 2 containers:  
1. the react app running at port 3000
2. the json server db running at port 3001  

**Important**  
If you run your app locally remember to create a file called db.json in *db* folder.  
Put this string into it:  
```
{"todos":[]}
```  

It's not necessary if you run the app using docker.  

Json server documentation  
[https://github.com/typicode/json-server#getting-started](https://github.com/typicode/json-server#getting-started)