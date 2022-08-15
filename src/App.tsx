import React, { createElement } from 'react';
//our components
import RequestList from './RequestListComponent/RequestList';
import SignIn from './SignInComponent/SignIn';
import SignUp from './SignUpComponent/SignUp';

function App() {
  return (
    <div>
      {/* <SignIn></SignIn>
      <br></br>
      <br></br>
      <SignUp></SignUp> */}
      <RequestList></RequestList>
    </div>
  );
  // return createElement('div', { className: 'container' }, [
  //   createElement('h1', { className: 'font-bold', key: 1 }, 'Test my JSX'),
  //   createElement('button', { className: '', key: 2 }, 'Click me'),
  // ]);
}

export default App;
