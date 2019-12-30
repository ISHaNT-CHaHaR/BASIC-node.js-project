const fs= require('fs');
const http= require('http');
const url= require('url');
////////////////////////////////////////////////////////////////////////////////

//Blocking synchronous  way 
//const textin = fs.readFileSync( './txt/input.txt','utf8');
//console.log(textin);

 //const textout= `This is what we know about the avocado:${textin}`;
 //fs.writeFileSync('./txt/output.txt',textout);
// console.log("file Written!");
  
 // Non-Blocking Asynchronous way.
//
/*fs.readFile('.txt/start.txt','utf-8', (err,data1)=>{
     if(err) return console.log('error');
    fs.writeFile(`.txt/${data1}.txt`,'utf-8', (err,data2)=>{
    console.log(data2);
    });
});
console.log("will read file!");
*///

///////////////////////////////////////////////////////////////////////////////////////////

//SERVER
 
const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8'); 
           const  dataObj=JSON.parse(data);
            
const server=http.createServer((req,res)=>{
    console.log(req.url);  
    const pathname = req.url;
    if(pathname === '/over'|| pathname==='/')
    {
        res.end('this is the overview');

    } 

    else if(pathname==='/product'){
        res.end('product ');
    }
    else if(pathname ==='/api'){
       
            res.writeHead(200,{'Content-type':'application/json'});
            res.end(data);
           

      

        
       
    } else{
        res.writeHead(404);
        res.end('<h1> page not found!</h1>');
    }
   
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('server has been started');
})























