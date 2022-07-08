import React, { useRef, useState } from 'react';
import './App.css';

import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

import logo from './images/logo.fw.png'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBTFageyJSoagnJpTGuo2MIt2sgEaBwEuo",
  authDomain: "guipedro-projetos.firebaseapp.com",
  projectId: "guipedro-projetos",
  storageBucket: "guipedro-projetos.appspot.com",
  messagingSenderId: "476862245206",
  appId: "1:476862245206:web:75362f0dbf0770d2c98ef7",
  measurementId: "G-TCE8ZC1Y7H"
})

//INÍCIO:

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


//~~~~~~~ COMPONENTE 1/5 ~~~~~~~ OK
function App() {

  const [user] = useAuthState(auth);
  //"user" representa aqui o sucesso no cadastro

  return (
    <div className="App">
      <header>
      {/*literalmente um header com `width` limitado*/}
        <img className="logo" src={logo} alt="1 chat 4 all" />
        <SignOut />
        {/*componente com condições (internamente)*/}
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
        {/*se true, faz tal coisa, se false, faz outra*/}
      </section>

    </div>
  );
}

//~~~~~~~ COMPONENTE 2/5 ~~~~~~~ OK
function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //criou novo ~objeto~ "firebase" com tais métodos
    if (provider !== null) {
    auth.signInWithPopup(provider);
    //método do Firebase usado em um objeto local (que por sua vez recebe o ~objeto~ firebase com a função "auth" - mesmo do objeto local) | 
    } else {
      console.log('erro na inserção')
    }
  }

  return ( //parte renderizada do componente
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>Entre com uma conta Google
      </button>
      {/*um botão e um aviso referentes ao `login` | o "onClick" executa a função criada acima*/}
      <div className='beware'>Não viole as regras de comunidade (sob pena de banimento definitivo)</div>
    </div>
  )
}

//~~~~~~~ COMPONENTE 3/5 ~~~~~~~ OK
function SignOut() {
  //função homônima ao método do cânon do Firebase
  return auth.currentUser && ( 
    //um return condicional (a condição nao está, portanto, na `renderização` ou não do componente, mas sim na `renderização` vide "return" no proprio escopo do componente) | Se houver um usuário, logo, ele poderá se deslogar (não se desloga quem não está logado) | O ".currentUser" deve ser `true`
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    //tirando o "return" e o "onClick", os 2 métodos/funções aqui presentes são do Firebase (".currentUser" e "signOut()")
  )
}



//~~~~~~~ COMPONENTE 4/5 ~~~~~~~
function ChatRoom() {
  const dummy = useRef();
  //🥎️⚛️useRef | hook | Hook que será usado mais abaixo

  const messagesRef = firestore.collection('messages');
  //🥎️📗.collection | O "messagesRef" nada mais é do que um `diretório` específico no database do Firebase que está sendo referenciado | instancia a collection "messages"
  const query = messagesRef.orderBy('createdAt').limit(1000);
  //🥎️📗.orderBy | aqui cria-se um objeto que recebe um `sub-segmento` de documentos da collection referenciada acima, segmento esse que é `ordenado por` "createdAt" e `limitado` a 1000 `documentos` | o nome "query" vem a calhar por ser como uma `query` de um database SQL comum | instancia "messages" ordenados pela data de criação limitando à 1000 `objetos`

  const [messages] = useCollectionData(query, { idField: 'id' });
  //🥎️📗useCollectionData | hook | Com o uso do array criado "messages" ^^^^^^^^^^^^FALTA SÓ ENTENDER ESSE (1/3)^^^^^^^^^^^^

  const [formValue, setFormValue] = useState('');
  //🥎️⚛️ | hook | é esse valor (o "formValue") que será alterado pelo formulário acessível ao usuário no "return"
    
  //"sendMessage" é uma função assíncrona:
  async function sendMessage(e) {
    e.preventDefault();

    //no escopo da "sendMessage":
    const { uid, photoURL } = auth.currentUser;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const dateAndHour = today.toLocaleDateString("en-US", options)
    //"uid" e "photoURL" vem do "currentUser"
    //a "await" (que vai rodar depois):
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      time: `${dateAndHour}`,
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    //🥎️⚛️useRef | responsável por fazer a página rolar até o "bottom"
  }
 
//--------------------.- return -.--------------------  
  return (<>
    <main>
      {messages && messages.map(msg => 
      <ChatMessage key={msg.id} message={msg} />)}
      {/*^^^^^^^^^^^^FALTA SÓ ENTENDER ESSE (2/3)^^^^^^^^^^^^*/}
      <span ref={dummy}></span>
      {/*🥎️⚛️useRef | ^^^^^^^^^^^^FALTA SÓ ENTENDER ESSE (3/3)^^^^^^^^^^^^*/}
    </main>
    
    <form onSubmit={sendMessage}>
    {/*no momento em que esse formulário é enviado, a função "sendMessage" é executada*/}
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escreva seu comentário" />
      {/*"formValue" é um `state` usado para guardar o `texto` | o "onChange" deverá alterar esse `state` "setFormValue"*/}
      <button type="submit" disabled={!formValue}>↗️</button>
    </form>
  </>)
}
//-----------------.- return (FIM) -.-----------------
/*end notes:
const gancho = useRef(null)
"useRef" é uma `caixa` que pode conter um valor mutável no seu ".current"
o elemento no qual você jogar o "gancho" (pelo "ref=gancho") vai ser `sentido` por outra ~função~ em que você também chamar o "gancho" ("gancho.current")
*/



//~~~~~~~ COMPONENTE 5/5 ~~~~~~~ OK
function ChatMessage(props) {
  const { text, uid, photoURL, time } = props.message;
  //desestruturado originalmente em "text", "uid" e "photoURL", e adicionalmente o "date"

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  //"uid" vem via props
  //passando o "if" pra obter um `true` ou `false` e saber se o `usuário` que postou é igual ao "uid"

  return ( //agora renderiza-se...
    <>
    <div className={`message ${messageClass}`}>
      {/*insere com o template string a classe da div*/}
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='avatar' />
      {/*"photoURL", "text" (e agora o "date" vem via props)*/}
      <p>{text}</p>
    </div>
      <div className={`time${messageClass}`}>{time}</div>
  </>)
}


export default App;



/*
Funções canônicas/Métodos da biblioteca/Expressões JS usadas:






*/