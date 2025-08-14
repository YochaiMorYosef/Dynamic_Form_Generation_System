import React from 'react';  
import './App.css';
import DynamicForm from './components/DynamicForm';
import PreviousSubmissionsList from './components/PreviousSub';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <DynamicForm />
        <PreviousSubmissionsList />
      </div>
      {/* <Submissions /> */}
    </div>
  );
}

export default App;
