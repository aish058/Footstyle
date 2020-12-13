import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Navbar} from './navbar';
import ReactDOM from 'react-dom';

class App extends Component {
    state={
      final :[],
      items:[],
      cart1:[],
      counter : 0,
      footwear:[],
      access:[]
    };
    showcart=()=>{
      var results=[]
      let k=0
       for (let i=0;i<localStorage.length;i++){
         for (let j in this.state.footwear){
           if(this.state.footwear[j][0]==localStorage.key(i)){
             let res=[]
             res.push(this.state.footwear[j][0]);
             res.push(this.state.footwear[j][1]);
            
             res.push("quantity",localStorage.getItem(localStorage.key(i)))
            res.push(this.state.footwear[j][2]);
            res.push(this.state.footwear[j][3]);
            res.push(this.state.footwear[j][4])
            results.push(res);
            //console.log(res);
            break;
           }
         }
         for (let j in this.state.access){
          if(this.state.access[j][0]==localStorage.key(i)){
            let res=[]
            res.push(this.state.access[j][0]);
            res.push(this.state.access[j][1]);
         
           // res.push("quantity",localStorage.getItem(localStorage.key(i)))
           res.push(this.state.access[j][2]);
           res.push(this.state.access[j][3]);
            res.push(this.state.access[j][4])
           results.push(res);
           break;
          }
        }

       }
       console.log(results);
       this.setState({
         items:results,
         final:results

       })
    }
  add = (props) => {
      let title;
      for (let i in this.state.final){
        if(this.state.final[i][4]==props)
        {
          title=(this.state.final[i][0]);
          break;
        }
      }
      if(localStorage.getItem(title)===null)
      localStorage.setItem(title,parseInt(1));
      else
      {
        let c=localStorage.getItem(title);
        c=parseInt(c)+1;
        localStorage.removeItem(title)
        localStorage.setItem(title,c);
      }
    }
  /*  add=(props)=>
  {
    console.log(props); 
    var description;
    var imageUrlStr;
    var mrp;
    var productBrand;
    var productId;
    var productUrl;
    var sellerAverageRating;
    var sellerName;
    var sellingPrice;
    var title;
      for(let i in this.state.final)
      {
        if(this.state.final[i][4]===props)
        {
          description=this.state.final[i][3];
          imageUrlStr=this.state.final[i][0];
          mrp=this.state.final[i][2];
          productBrand=this.state.final[i][6];
          productId=this.state.final[i][4];
          productUrl=this.state.final[i][7];
          sellerAverageRating=this.state.final[i][8];
          sellerName=this.state.final[i][9];
          sellingPrice=this.state.final[i][5];
          title=this.state.final[i][1];
          break;
        }
      }
      var obj={
        description:description,
        imageUrlStr:imageUrlStr,
        mrp:mrp,
        productBrand:productBrand,
        productId:productId,
        productUrl:productUrl,
        sellerAverageRating:sellerAverageRating,
        sellerName:sellerName,
        sellingPrice:sellingPrice,
        title:title
      }
      var newArray=[];
      //newArray=this.state.cart1.slice();
      newArray.push(obj);
      console.log(newArray)
      this.setState(
        {
          cart1:newArray,
          counter:this.state.counter+1
        },
        ()=>{
          

          if(localStorage.getItem(props)===null)
          localStorage.setItem(props,this.state.cart1);
          else
          localStorage.setItem(props,localStorage.getItem(props).push(this.state.cart1))
          localStorage.setItem("quantity",this.state.counter);
        }
      );
    }*/
    remove = (props) => {
      let title;
      for (let i in this.state.final){
        if(this.state.final[i][4]==props)
        {
          title=(this.state.final[i][0]);
          break;
        }
      }
     
      if(localStorage.getItem(title)===null)
      alert("This item doesn't exist in cart");
      else
      {
        let c=localStorage.getItem(title);
        c=parseInt(c)-1;
        if(c!=0){

        localStorage.removeItem(title)
        localStorage.setItem(title,c);
        }
        else{
          localStorage.removeItem(title);
        }
      }
    }
    footware = () => {
      console.log("first click working");
      fetch('http://101.53.137.41/api/?cat=Footwear&count=100&offset=0;')
      .then(accessories=>accessories.json())
      .then(response=>{
        let results =[]
        for(let i=0;i<3;i++)
        {
          let res =[]
          res.push(response[i].title)
          res.push(response[i].imageUrlStr.split(';')[0]);
          res.push(response[i].mrp);
          res.push(response[i].description);
          res.push(response[i].productId);
         // res.push(response[i].sellingPrice);
          //res.push(response[i].productBrand);
          //res.push(response[i].productUrl);
          //res.push(response[i].sellerAverageRating);
          //res.push(response[i].sellerName);
          results.push(res);

        }
        this.setState({
          final : results,
          footwear:results
        })
        //console.log(this.state.result);
      })
    }
  sprayAccessories = () => {
    console.log("first click working");
    fetch('http://101.53.137.41/api/?cat=Footwear_Accessories_Sprays&count=100&offset=0;')
    .then(accessories=>accessories.json())
    .then(response1=>{
      let results =[]
      for(let i=0;i<34;i++)
      {
        let res =[]
        res.push(response1[i].title)
        res.push(response1[i].imageUrlStr.split(';')[0]);
        res.push(response1[i].mrp);
        res.push(response1[i].description)
        res.push(response1[i].productId)
        results.push(res);
      }
      this.setState({
        final : results,
        access:results
      })
      console.log(this.state.result);
    })
  };
  render() {
    return (
      <div>
      <div>
        <Navbar sprayAccessories={this.sprayAccessories}/>
        </div>
        <div>
        {
          this.state.final.map(ig=>{
          return(
            <div className="abc">
              <a href="cart.html">
              <img src={ig[1]} alt="imageajska"/>
              <h5>{ig[0]}</h5>
              </a>
              <p> <i class="far fa-rupee-sign"></i>{ig[2]}</p>
              <button className="btn btn -success"  onClick= {()=>{this.add(ig[4])}}>Add to Cart</button> 
              <button className="btn btn -success"  onClick= {()=>{this.remove(ig[4])}}>Remove from Cart</button>            
              </div>
          )}
        )}
        </div>
        <div>
          <button onClick={this.sprayAccessories}>Spray Accessories </button>
          <button onClick={this.footware}> Footware </button>
          <button onClick={this.showcart}>Show Cart</button>
        </div>
        </div>
    );
  }
}
export default App;
ReactDOM.render(<App />,document.querySelector('#root'));