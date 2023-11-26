import { useNavigate } from 'react-router-dom';

const   Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
//   -1 is to go back 1 step in the browsing history

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};

export default Unauthorized;
