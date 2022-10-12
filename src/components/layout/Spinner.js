import PulseLoader from 'react-spinners/PulseLoader';

const container = {
  height: 50,
  zIndex: 2,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  left: 'calc(50% - 90px / 2)',
  top: 'calc(50% - 20px / 2)',
};

function Spinner() {
  return (
    <div style={container}>
      <h2>Loading</h2>
      <PulseLoader color='#4b4c4e' loading size={10} speedMultiplier={1} />
    </div>
  );
}

export default Spinner;
