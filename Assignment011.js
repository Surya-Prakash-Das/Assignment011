
//getting elements from html
const table= document.getElementById('table');
const searchbutton = document.getElementById('search');
const input = document.getElementById('search-input');
const trash = document.getElementById('trash');
const home = document.getElementById('home');
let d = fetch('https://643674918205915d34f3ea06.mockapi.io/test2').then(respone=> respone.json().then(result=>{return(result)}));//fetching data from url
let notTrash=true;
const DataTable = async () => {                         //async function for 
    const data=await d; 
    search(data);                                       //function for creating table at intial
    searchbutton.addEventListener("click",function(){   //function for searching and creating table with search parameter
        notTrash=false;
        search(data,input.value,notTrash);
        input.value="";               
    })
    home.addEventListener("click",function(){           //function for searching and creating table with all data
        notTrash=true;
        search(data);
    })
    trash.addEventListener("click",function(){          //function for searching and creating table with delete data
        notTrash=false;
        search(deletedata,input.value="",notTrash);
    })
};
let deletedata =[]; 
function createtable(table,data,fordetele,notTrash=true){ //define a function to create element of the table with conditions
    let thead = table.createTHead();
    let row = thead.insertRow();
    let headings = Object.keys(data[0]);
    for (let key of headings) {                           //for loop to create headings of tabel
        let th = document.createElement('th');
        th.innerHTML=key;                                 //heading is key of object
        th.className="title headrow"; 
        row.appendChild(th);
      }
      if(notTrash==true){                                 //checking if we need to create delete heading 
        let th = document.createElement('th');
        th.innerHTML="DELETE";      
        th.className="title headrow"; 
        row.appendChild(th);
      }
    for(let keys of data){                               //for loop to create each row and cells of tabel
        let roww = table.insertRow();
        roww.className = "each-row";
        for(let key in keys){
            let cell = roww.insertCell();
            cell.className = "title";
            cell.innerHTML=keys[key];                     //in each cell we are putting values of key
        }
        if(notTrash==true){                               //checking if we need to create delete button
            let cell = roww.insertCell();
            cell.className = "title";
            const deletbutton = document.createElement('button');
            deletbutton.innerHTML="DELETE";
            cell.appendChild(deletbutton);
            deletbutton.addEventListener("click",function () {   //Adding delete function to button
                deletedata.push(keys);
                this.parentElement.parentElement.remove();
                fordetele.splice(keys,1);
                
            })
        }
    }
}
function search(data,text1="",notTrash){ //define a function for searching if parameter is given else default parameter will be taken
    let text =text1.trim();
    if(text==""){
        text=" ";
    }
    
    if(table.firstChild){
        table.firstChild.remove();
    }
    let newdata=[];
    for(let keys of data){
        const propertyValues = Object.values(keys);
        let pattern = new RegExp(text ,'i');
        const res=propertyValues.filter(key=>{
            key = key.toString();
            return key.match(pattern);
        });
        if(res.length!=0){
            newdata.push(keys);
        }
    }
    createtable(table,newdata,data,notTrash) //calling function to create table with parameter
}
DataTable();