const express=require('express');
const app=express();
const cors = require('cors');
// const postgres=require('postgres');
app.use(express.json());
app.use(cors())

const { Pool, Client } = require("pg");
const { request } = require('http');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: "5432"
});


app.get('/employeelist',(req,res)=>{
    let sql="SELECT eid,ename,email_add,doj,date_of_resign FROM public.employee";
    pool.query(sql, (err, resultset) => {
        if(err) console.log("failed in executing the queery please verify...");
       console.log(resultset);
        res.send(resultset.rows);
        //pool.end();
      })
});

app.get('/employeelist/:id',(req,res)=>{
  // console.log(req.params.id);
  let sql="SELECT eid,ename,email_add,doj,date_of_resign FROM public.employee where eid="+req.params.id;
 console.log(sql);
  pool.query(sql, (err, resultset) => {
      if(err) console.log("failed in executing the queery please verify...");
     
      res.send(resultset.rows);
      //pool.end();
    })
});



app.delete('/deleteemployee/:id',(req,res)=>{
   console.log(req.params.id);
  let sql="DELETE FROM public.employee where eid="+req.params.id;
 console.log(sql);
  pool.query(sql, (err, resultset) => {
      if(err) console.log("failed in executing the queery please verify...");
     
      res.send(resultset.rows);
      //pool.end();
    })
});

app.post('/addemployee',(req,res)=>{
    let empname;
    let emailAdd;
    let empdoj; 
    let empid;
    let dateOfResign;
    this.empname=req.body.ename;
    this.emailAdd=req.body.email;
    this.empdoj=req.body.doj;
this.dateOfResign=req.body.dateOfResign;
    
    pool.query("select max(eid) from public.employee", (err, result) => {
        if(err) throw err;
        console.log(result.rows[0].max);
        this.empid=result.rows[0].max+1;

        console.log(typeof this.empid);
        console.log(empdoj);
        let sqlInsert=`INSERT into public.employee(eid,ename,email_add,doj,date_of_resign) values(${this.empid},'${this.empname}','${this.emailAdd}','${this.empdoj}','${this.dateOfResign}')`;
        console.log(sqlInsert);
    
        pool.query(sqlInsert, (err, resultset) => {
             if(err) throw err;
            console.log("insert query :"+resultset);
            res.send(resultset);
            //pool.end();
          });
        });
      });

      app.put('/updateemployee/:id',(req,res)=>{
        let empname;
        let emailAdd;
        let empdoj; 
        let empid;
        let dateOfResign;
        this.empid=req.params.id;
        this.empname=req.body.ename;
        this.emailAdd=req.body.email;
        this.empdoj=req.body.doj;
      this.dateOfResign=req.body.dateOfResign;
            let sqlInsert=`UPDATE public.employee SET ename='${this.empname}',email_add='${this.emailAdd}',doj='${this.empdoj}',date_of_resign='${this.dateOfResign}' where eid=${this.empid}`;
            console.log(sqlInsert);
        
            pool.query(sqlInsert, (err, resultset) => {
                 if(err) throw err;
                console.log("insert query :"+resultset);
                res.send(resultset);
                //pool.end();
              })
    
    // res.send(req.body.ename);
    // res.end();
});

const port=process.env.PORT||4000
app.listen(port,()=>console.log(`server is running on this ${port} port ....`));