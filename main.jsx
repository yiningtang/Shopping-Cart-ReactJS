




var ServiceChooser = React.createClass({
   getInitialState: function(){
        return { total: 0,searchString:"",items:[],num:0}; 
        
        
    },

componentDidMount: function(){
        
     
        var self = this;
    

        var url = 'http://www.json-generator.com/api/json/get/ceKyQrBUqG?indent=2';


    
 $.getJSON(url, function(data) {           
      


   self.setState({ items: data}); 



        



       
     });
   },


          




   
   addTotal: function( price,n ){

        
  
     this.setState({ total:this.state.total+price  });
     this.setState({ num:this.state.num+n  });


    },
      handleChange: function(e){


        this.setState({searchString:e.target.value.toLowerCase()});

    },

    render: function() {
       items=this.state.items;
        var self = this;
      total=this.state.total;
      active=this.state.active;
      num=this.state.num;

  
        var items1 = this.state.items.map(function(s){

         

            return <Service name={s.name} price={s.price} active={s.active} addTotal={self.addTotal}  />;
        });
 
    searchString = this.state.searchString;

     if(searchString.length > 0){

            

            items1 = this.state.items.filter(function(a){
                  
                return a.name.toLowerCase().match(searchString);
            });
            items1 = items1.map(function(s){

         

            return <Service name={s.name} price={s.price} active={s.active} addTotal={self.addTotal}  />;
        });

        }
   
        
        return <div id="content">
                    <h1>Your Order</h1>
                     
                    
                   <div className="quickSearch"> <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" /><i className="fa fa-search"></i></div>
                   
                  
                    
                    {items1}

                  
                   
                    
                    <p id="total">You have chosen <b>{this.state.num}</b> items,$ <b>{this.state.total.toFixed(2)}</b> in total</p>
                </div>;

    }
});


var Service = React.createClass({
   getInitialState: function(){
        return { active: false }; 
        
        
    },
     

   clickHandler: function (){

        var active = !this.state.active;

        this.setState({ active: active });
        var price= this.props.price;
       

        if (active==true)
        {
 

this.props.addTotal(price,1);



       
        }
    else
        {      alert("This item will be deleted!");
     this.props.addTotal(-price,-1);
     
   
         }
      
     
        

    },

    render: function(){
     



      return <div className="items"  onClick={this.clickHandler}><p className={ this.state.active ? 'active' : '' } >
                   {this.props.name} <b>${this.props.price.toFixed(2)}</b>
                   
                </p>
              
                 </div> 
                  
                ;

    }

});


React.render(
    <ServiceChooser  />,
    document.getElementById("container")
);

  