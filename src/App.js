import React, { Component } from 'react';
import TodoList from './components/todolist'

const styles = {
  container: {
    paddingLeft:100,
    paddingTop:50
  },
  rate: {
    marginLeft:90
  },
  nop: {
    marginLeft:19
  },
  note: {
    marginLeft:82
  },
  fave: {
    marginTop:70,
    width:500,
  }
}

class App extends Component {
  constructor () {
     super();
     this.state = { 
      text: '', 
      rate: '',
      note: '',
      items: [] 
    }
   }
  // it runs right before the mounting of component
  componentWillMount() {
    // getting item from localStorage & parse it into a JSON object
    const getList = JSON.parse(localStorage.getItem('favouriteList'));
    this.setState({
      // if getList is empty or null then it will return an empty array [] otherwise it will return an array of object(s)
      items: getList ? getList : []
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    const text = this.state.text;
    const rate = this.state.rate;
    const note = this.state.note;
    // create an object to push in items array
    const obj = {
      'text' : text,
      'rate' : rate,
      'note' : note
    }
    var newItems = this.state.items.concat(obj);
    this.setState({ text: '', rate: '', note: '',  items: newItems });
    // setting an Item in localStorage 
    localStorage.setItem('favouriteList', JSON.stringify(newItems));
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeItem(i) {
    // delete the selected index 'i' and returns the array
    this.state.items.splice(i, 1)
    // setting an Item in localStorage right after changing the array
    localStorage.setItem('favouriteList', JSON.stringify(this.state.items))
    this.setState({
      items: this.state.items
    })
  }

  render() {
    return (
      <div className='container'>
        <div>
          <h1> Save The Moment  </h1>
          <form onSubmit={this.handleSubmit.bind(this)} className='card-view'>
            Name of Place:<input style={styles.nop} onChange={this.handleChange} name='text' value={this.state.text} required/>
            <br/>
            Rate:<input style={styles.rate} onChange={this.handleChange} name='rate' value={this.state.rate} required/>
            <br/>
            Notes:<input style={styles.note} onChange={this.handleChange} name='note' value={this.state.note} required/>
            <br/>
            <br/>
            <br/>
            <button>Submit</button>
          </form>
          </div>
        <div>
          <TodoList style={styles.fave} items={this.state.items} removeItem={(i) => this.removeItem(i)}/>
        </div>
      </div>
    )        

  }
}

export default App;
