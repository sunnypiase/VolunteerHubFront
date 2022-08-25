import { ExampleFormik } from '../Components/ExampleFormik';

function TestPage() {
  return (
    <div>
      <ExampleFormik
        onSubmit={({ email, firstName, lastName }) => {
          console.log(email, firstName, lastName);
        }}
      />
    </div>
  );
}

export default TestPage;
