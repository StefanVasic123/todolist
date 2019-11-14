import React, { Component } from 'react';
import removeBtn from './removeBtn';


class MainToDo extends Component {
    constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      list: [],
      clickedItem: [],
      taskList: '',
      projectItems: [],
      addedNewTasks: ["null"],
      on: false,
      temporaryStorage: [],
      nullState: []
    }
  }
  firstUserInput = (input) => {
    this.setState({
        userInput: input
    });
  }
  
  addingTask = (input) => {
      this.setState({
          taskList: input
      })
       console.log(this.state.addedNewTasks);
  }

  addToList = (input) => {
      let listArray = this.state.list;
      listArray.push(input);

      localStorage.setItem('listLS', JSON.stringify(this.state.list));
    
      this.setState({
          list: listArray,
          userInput: '',
          addedNewTasks: []
      })
      console.log(this.state.addedNewTasks);
  }
  addingTaskToList = (input) => {
    console.log(this.state.addedNewTasks);
    let x = localStorage.getItem('clickedItem');
    let y = x;
    let alpha = this.state.taskList;

    let a = localStorage.getItem('clickedItem');
    let b = localStorage.getItem(a);

    localStorage.setItem('shadowedTasks', b);
    localStorage.setItem(y, JSON.stringify(alpha));
    let c = localStorage.getItem('shadowedTasks');

    console.log(this.state.addedNewTasks);
    let addTaskArray = this.state.addedNewTasks;
    console.log(this.state.addedNewTasks);
    addTaskArray.push(input); 
    
    console.log(this.state.addedNewTasks);
     this.setState({
        addedNewTasks: addTaskArray, 
         taskList: ''
     }) 
     console.log(this.state.addedNewTasks);
    localStorage.setItem(x, JSON.stringify(this.state.addedNewTasks.
        filter(function (value, index, arr) {
            return value !== "null"})
            )); 
            console.log(this.state.addedNewTasks);
}
   componentDidMount() {
       if(localStorage.getItem('listLS') === null) { 
                this.setState({
                    list: []
                })
            } else {
                let arrLS = localStorage.getItem('listLS');
                let parse = JSON.parse(arrLS);

                this.setState({
                      list: parse
                })
        }

        if(localStorage.getItem('clickedItem') === null) {
            this.setState({
                addedNewTasks: []
            })
         } else {
                let getClickedItemName = localStorage.getItem('clickedItem');
                let getTasks = localStorage.getItem(getClickedItemName); 
                let parseTasks = JSON.parse(getTasks);

                this.setState({
                    addedNewTasks: parseTasks
                });

                localStorage.setItem('shadowedTasks', getTasks); 
        } 
    } 
    
    componentDidUpdate() {
        if(localStorage.getItem('shadowedTasks') !== null && localStorage.getItem('clickedItem') !== null) {
        let a = localStorage.getItem('clickedItem');
        let b = localStorage.getItem(a);
        let c = localStorage.getItem('shadowedTasks');
        console.log(this.state.addedNewTasks);        
                let getTasks = localStorage.getItem([a]);
                let combine = [getTasks||[], c||[]];
                const stateNull = combine.filter(function (value, index, arr) {
                         return value !== "null"
                 });
                 console.log(this.state.addedNewTasks);    
                     let jointArray = [];

                     stateNull.forEach(array => {
                        jointArray = [...jointArray, array] 
                     })
                     const stateNullFull = [...new Set([...jointArray])];
                     const [first, ...rest] = stateNullFull;
                     console.log(this.state.addedNewTasks);     
                localStorage.setItem(a, first);
                localStorage.removeItem('shadowedTasks'); 
                console.log(this.state.addedNewTasks);
                if(this.state.addedNewTasks !== b) {
                     this.setState({
                         addedNewTasks: JSON.parse(b)
                    })
                    console.log(this.state.addedNewTasks);
                }
        }
        console.log(this.state.addedNewTasks);
} 

  componentWillUnmount() {
      window.addEventListener('beforeunload', function(e) {
          return localStorage.push(this.state.list);
          console.log(this.state.addedNewTasks);
      })
  }
  
  handleClick = e => { //if clicked item nije vrednost stejta
      let clicked = e.target.id; 
      let listLS = localStorage.getItem('listLS');
      let listLSParse = JSON.parse(listLS);
      localStorage.setItem('clickedItem', listLSParse[clicked]);
      let a = localStorage.getItem('clickedItem');
      let b = localStorage.getItem(a);
      console.log(this.state.addedNewTasks);
      this.setState({
        clickedItem: localStorage.getItem('clickedItem')
      });
      console.log(this.state.addedNewTasks);
      (b !== null) ? 
        this.setState({ 
            addedNewTasks: JSON.parse(b)
        }) :
        this.setState({addedNewTasks: ["null"]});
        
  }
 
    render() {
        return (
                <div className="ui container">
                    <div className="container-segment">
                        <h2 className="ui project">Add your new project</h2>
                        <input type="text" 
                        onChange={(e) => this.firstUserInput(e.target.value)}
                        value={this.state.userInput}  
                        placeholder="Enter Project" />
                        <button onClick={() => this.addToList(this.state.userInput)}>Add</button>
                    </div>
                    <div className="container-segment">
                        <h2 className="ui project">Projects</h2>
                            <ul style={{textDecoration: 'none', listStyleType:'none'}}>
                                {this.state.list.map((obj, id) => 
                                    <li key={obj[id]} id={id}
                                    onClick={this.handleClick}
                                    style={{cursor: 'pointer'}}>
                                        {obj}
                                    </li>
                                )} 
                            </ul>
                    </div>
                    <div className="container-segment">
                        <h2 className="ui project">
                            {this.state.clickedItem} 
                            <input  type="text"
                                    onChange={(e) => this.addingTask(e.target.value)}
                                    value={this.state.taskList} 
                            placeholder="Enter Task" /> 
                            <button onClick={() => this.addingTaskToList(this.state.taskList)}>Add Task</button> 
                        </h2>
                    </div>
                    <div className="container-segment">
                    <ul style={{textDecoration: 'none', listStyleType:'none'}}>
                        {this.state.addedNewTasks
                            .filter(function (value, index, arr) {
                                return value !== "null"})
                            .map((obj, id) => 
                        <li key={obj[id]} id={id}>
                            {obj}  
                        </li>
    )}   
                                        
                    </ul>
                    </div>
                </div>
        );
    }
}

export default MainToDo;

//najveci problem je shvatiti problem
//Da pisu te moje izreke