import logo from './logo.svg';
import './App.css';
import React from 'react';


var id=1;
var newsarr=[];
var newsarr3=[];
var remain = 0;
var activtasks=0;
var comtasks=0;

class App extends React.Component {
  constructor(props)
  {
    super(props);

    this.state={
      value:'',
      todoList:[],
      editid:'',
      tasks_remaining:'',
      flag_filters:'1',
    }
  }

  onChange = e =>{
    this.setState({value:e.target.value})
  }
  addTask = e => {
    var checked=false;
    var label = this.state.value;
    const todoList1=[{id,checked,label}];
    this.setState({todoList:[...this.state.todoList,...todoList1]});
    id = id+1;
    remain = remain +1;
    // this.setState({editid:id});
    if(this.state["editid"])
    {
      // console.log(this.state["editid"])
      remain = remain -1 ;
      const todoList=this.state.todoList;
      newsarr=[...todoList];
      this.state.todoList.map(item => {
        const {id,checked,label} = item;
        // console.log(id);
        if(this.state["editid"]==id)
        {
          // this.setState({label:this.state.value});
              var index=newsarr.indexOf(item);
              newsarr[index]={...newsarr[index],label:this.state.value};
              this.setState({todoList:newsarr});
              this.setState({editid:''});

        }
      })
    }
    this.setState({value:''});

  }


  editTask = (edit_id,edit_label) => {
    return () => {
      this.setState({editid:edit_id});
      this.setState({value:edit_label});
      
    }
  }

  deleteTask = (del_id) => {
  
  return () => {
  var flag=1;
  remain = remain -1;
  const todoList=this.state.todoList;
  newsarr=[...todoList];
  this.state.todoList.map(item => {
    const {id,checked,label} = item;
    if(flag==1){
    if(id==del_id)
    {
      flag=2;
      // console.log(item["id"]);
      var index=newsarr.indexOf(item);
      // console.log(index);
      newsarr.splice(index,1);
      // this.setState({todoList:[...this.state.todoList,newsarr]});
      this.setState({todoList:newsarr});

    }
  }
  })
}
 
}
checkChange = (c_id,c_checked,c_label) => {
   
  return () => {
    const todoList=this.state.todoList;
    newsarr=[...todoList];
    var flag=1;
      this.state.todoList.map(item => {
        const {id,checked,label} = item;
         if(flag==1)
         {
           if(id==c_id)
           {
             flag=2;
            var index=newsarr.indexOf(item);
            newsarr[index]={...newsarr[index],checked:!c_checked};
            if(checked==false)
            {
              newsarr[index]={...newsarr[index],label:c_label}
            }
            this.setState({todoList:newsarr});
           }
         }
      })
      console.log(c_checked);
    // this.state.todoList.map(item => 
    //   item.id !== c_id ? item : {...item,checked:!c_checked,label:c_label}
    // )
  }
  

}

clickAll = () => {
  return () => {
    this.setState({flag_filters:'1'});

  }
  

}

clickActive = () => {
  return () => {
    this.setState({flag_filters:'2'});
  
  }
  

}

clickCompleted = () => {
  return () => {
    this.setState({flag_filters:'3'});
  
  }
  

}


  render(){
  return (
    <div className="setborder">   
      <div className="heading_name">
       <p className="para"></p>
      <label className="heading" id="heading">What needs to be done ?</label>
      <label for="activ"> </label>
      <input type="text" id="activ" className="activ" placeholder="Add Task . . ." value={this.state.value} onChange={this.onChange}></input>
      <button id="add" className="add" type="button" onClick = {this.addTask}>Add</button>
      <div className="div1">
            <div className="movement">
                <a id="all2" className="all" onClick={this.clickAll()} >All</a>
                  <a id="activ2" onClick={this.clickActive()}>Active</a>
                  <a id="comp" onClick={this.clickCompleted()}>Completed</a>

              </div>

                <div id="div2" className="div2">
                    
                    <p className = "remaining" id="remaining">{remain} tasks remaining</p>
                  </div>
                  </div> 
      
      {/* this.state.todoList.filter((item => {
        const {id,checked,label} = item;
        if(flag_filters==1)
          return true;
        else if(flag_filters==2)
        {
           return checked === false; 
        }
        else if(flag_filters==3)
        {
           return checked===true;
        }
      }
      )) */}
      {this.state.todoList.filter( (item) => {
        if(this.state.flag_filters==='1')
        {
          return true;
        }

        if(this.state.flag_filters==='2')
        {
          if(item.checked===false)
            return true;
        }
        if(this.state.flag_filters==='3')
        { 
          if(item.checked===true)
            return true;
        }
        
      }).map(item => {
        const { id, checked, label } = item;
        return (
          <div id="div2" className="div2">
           <input type="checkbox"  className="checkbox-checked" value={checked} onChange={this.checkChange(id,checked,label)}></input>
            
            <p style={{marginLeft: "40px",textDecoration:checked ?'line-through':'none'}}>{label}</p>
            <button id="edit_button" className="edit_button" onClick={this.editTask(id,label)} >
              Edit
            </button>
            <button id="delete_button" className="delete_button" onClick={this.deleteTask(id)}   >
              Delete
            </button>
            
            
          </div>
        )
      })
    }

      </div> 
      </div>
  );
  }
}

export default App;
