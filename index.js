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
 const replaceTemplate=(temp,product)=>{
     let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
     output=output.replace(/{%IMAGE%}/g,product.image); 
     output=output.replace(/{%PRICE%}/g,product.price); 
     output=output.replace(/{%FROM%}/g,product.from); 
     output=output.replace(/{%NUTRIENTS%}/g,product.nutrients); 
     output=output.replace(/{%QUANTITY%}/g,product.quantity); 
     output=output.replace(/{%DESCRIPTION%}/g,product.description); 
     output=output.replace(/{%ID%}/g,product.id); 
        
     if(!product.organic){
        output=output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); 
     }
        return output;
 };
const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8'); 
const tempOverview =  fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8'); 
const tempCard =  fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8'); 
const tempProduct =  fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
  
           const  dataObj=JSON.parse(data);
            
const server=http.createServer((req,res)=>{
    console.log(req.url);  
    const pathname = req.url;

    //Over view PAGe.
    if(pathname === '/over'|| pathname==='/')
    {

        res.writeHead(200,{'Content-type':'text/html'});
         const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard, el )).join('');
         const output= tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml); 
        res.end(output);

    } 
    /// PRODUCT PAGE
    else if(pathname==='/product'){
        res.end('product ');
    }

    /// API
    else if(pathname ==='/api'){
       
            res.writeHead(200,{'Content-type':'application/json'});
            res.end(data);
           

      

         //NOT FOUND...

       
    } else{
        res.writeHead(404);
        res.end('<h1> page not found!</h1>');
    }
   
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('server has been started');
})























