import { useState } from 'react';
import { mint } from './Web3Service';
import ReCAPTCHA from 'react-google-recaptcha';

function App() {

  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");

  function connectWallet(){
    if(captcha){
      setMessage("Requesting your tokens... wait...");
      mint()
        .then((tx) => setMessage(`Your tokens were sent to ${localStorage.getItem("wallet")}. Tx: ${tx}`))
        .catch(err => setMessage(err.response ? err.response.data : err.message));
      setCaptcha("");
    }
    else
      setMessage("Check the I´m not a robot box first.")
  }

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header className="mb-auto">
      <div>
        <h3 className="float-md-start mb-0">ProtoCoin Faucet</h3>
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
          <a className="nav-link fw-bold py-1 px-0" href="#">About</a>
        </nav>
      </div>
    </header>

    <main className="px-3">
      <h1>Get your ProtoCoins</h1>
      <p className="lead">Once a day, earn 10.000 coins for free just connecting you MetaMask below.</p>
      <p className="lead">
        <a href="#" onClick={connectWallet} className="btn btn-lg btn-light fw-bold border-white bg-white">
          <img src="/assets/metamask.svg" alt="MetaMask logo" width={48} />
          Get my tokens
        </a>
      </p>
      <div style={{ display: "inline-flex" }}>
        <ReCAPTCHA sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`} onChange={value => setCaptcha(value || "")} />
      </div>
      <p className='lead'>
        {message}
      </p>
    </main>

    <footer className="mt-auto text-white-50">
      <p>Built by <a href="#" className="text-white">CidMiranda</a>.</p>
    </footer>
  </div>
  );
}

export default App;
