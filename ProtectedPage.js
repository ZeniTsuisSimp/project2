import withAuth from '../hocs/withAuth';

const ProtectedPage = () => {
  return (
    <div>
      <h1>Welcome to Project 2</h1>
      {/* Your protected content here */}
    </div>
  );
};

export default withAuth(ProtectedPage);