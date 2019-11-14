import React from 'react';

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
      localStorage.getItem(localStorageKey) || '',
    );
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [value]);
    return [value, setValue];
  };
  const Test = () => {
    const [value, setValue] = useStateWithLocalStorage(
      'myValueInLocalStorage',
    );
    const onChange = event => setValue(event.target.value);
    const onClick = event => setValue(event.target.value);
    return (
      <div>
        <h1>Hello React Function Component!</h1>
        <input value={value} type="text" onChange={onChange} />
        <button onClick={onClick}>CLick!</button>
        <p>{value}</p>
      </div>
    );
  };

  /*

                    <div className="container-segment">
                    <ul style={{textDecoration: 'none', listStyleType:'none'}}>
                        {this.state.addTask.map((obj, id) => 
                            <li key={obj[id]} id={id}>
                                {obj} <button onClick={this.taskHandleClick}>Add Task</button> 
                            </li>
                        )}
                    </ul>
                    </div>
  */


  export default Test;