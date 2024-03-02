import Web3 from "web3";
import { AbiItem } from "web3-utils";
import ABI from './abi.json';
import ReactDOMServer from 'react-dom/server';

const ADAPTER_ADDRESS = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;

function getWeb3() : Web3 {
    if(!window.ethereum) throw new Error(`No MetaMask found.`);
    return new Web3(window.ethereum);
}

function getContract(web3?: Web3) /*: Contract*/ {
    if(!web3) web3 = getWeb3();
    return new web3.eth.Contract(ABI as AbiItem[], ADAPTER_ADDRESS, { from: localStorage.getItem("account") || undefined });
}

type LoginResult = {
    account: string;
    isAdmin: boolean;
}

export async function doLogin() : Promise<LoginResult> {
    const web3 = getWeb3();
    const accounts = await web3.eth.requestAccounts();
    
    if(!accounts || !accounts.length)
        throw new Error(`Wallet not found/allowed`);

    
    const contract = getContract(web3);
    //const ownerAddress = await contract.methods.owner().call();
    const ownerAddress = ReactDOMServer.renderToString(await contract.methods.owner().call()).toLowerCase;
    //alert(accounts[0].toLowerCase === ownerAddress);
    
    localStorage.setItem("account", accounts[0]);
    localStorage.setItem("isAdmin", `${accounts[0].toLowerCase === ownerAddress}`);

    return{
        account: accounts[0],
        isAdmin: accounts[0].toLowerCase === ownerAddress //gambi
    } as LoginResult;

}