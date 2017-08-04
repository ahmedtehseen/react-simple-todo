import React, { Component } from 'react';


class TodoList extends Component {
 render() {
    return (
      <div>
        <h1>Saved List</h1>
        {this.props.items.map((item, i) => {
          return (
            <div key={i} className='card-view'>
              <h3>{i+1}</h3>
              <p><em>Name of Place:</em> {item.text} </p>
              <p><em>Rate:</em> {item.rate} </p>
              <p><em>Notes:</em> {item.note} </p>
              <button onClick={() => this.props.removeItem(i)}>Delete</button>
            </div>
          )
        })}
      </div>
    )     
  }
}
export default TodoList;