import React from 'react';

export function OnboardingButton(props) {
  const [buttonText, setButtonText] = React.useState("Connect Metamask");

  const onClick = () => {

    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log('MetaMask Present!');

        window.ethereum.request({ method: 'eth_requestAccounts'})
        .then(result => {
            props.handleClick(result[0]);
            setButtonText('Wallet Connected');
        })
        .catch(error => {
            console.log(error.message);
        });

    } else {
        console.log('MetaMask not Installed');
    }

  };
  return (
    <button onClick={onClick} className=".btn" id="connectWallet">
      {buttonText}
    </button>
  );
}