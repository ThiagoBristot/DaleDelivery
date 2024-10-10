import React, { useState } from 'react';
import './App.css';
import Notification from './Notification';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function App() {

  // Estado para controlar a visibilidade das informações da empresa
  const [showInfo, setShowInfo] = useState(false);

  // Estado para controlar a exibição do modal de login
  const [showLogin, setShowLogin] = useState(false);

  // Estado para controlar a exibição da lista de hambúrgueres
  const [showBurgers, setShowBurgers] = useState(false);

  // Estado para controlar a exibição da lista de porções
  const [showPorcao, setShowPorcao] = useState(false);

  // Estado para controlar a exibição da lista de drinks
  const [showDrinks, setShowDrinks] = useState(false);

  // Estado para controlar a exibição da lista de aguas
  const [showAgua, setShowAgua] = useState(false);

  // Estado para controlar a exibição da lista de refrigerantes
  const [showRefri, setShowRefri] = useState(false);

  // Estado para alternar entre login e cadastro
  const [isLogin, setIsLogin] = useState(true);

  // Estado para controlar o carrinho
  const [showCart, setShowCart] = useState(false)

  // Estado para controlar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState({ street: '', number: '', neighborhood: '', complement: '' });

  const [notification, setNotification] = useState({ message: '', type: 'success' });

  // Função para alternar a visibilidade das informações da empresa
  const toggleInfo = () => {
    setShowInfo(prevState => !prevState);
  };

  // Função para alternar o modal de login
  const toggleLogin = () => {
    setShowLogin(prevState => !prevState);
  };

  // Função para alternar a visibilidade da lista de hambúrgueres
  const toggleBurgers = () => {
    setShowBurgers(prevState => !prevState);
  };

  // Função para alternar a visibilidade da lista de porções
  const toggleporcao = () => {
    setShowPorcao(prevState => ! prevState)
  }

  // Função para alternar a visibilidade da lista de drinks
  const toggleDrinks = () => {
    setShowDrinks(prevState => !prevState);
  };

  // Função para alternar a visibilidade da lista de aguas
  const toggleAgua = () => {
    setShowAgua(prevState => !prevState)
  }


  // Função para alternar a visibilidade da lista de refrigerantes
  const toggleRefri = () => {
    setShowRefri(prevState => !prevState)
  }

  // Função para alternar entre login e cadastro
  const toggleForm = () => {
    setIsLogin(prevState => !prevState);
  };

  // Função para abrir o carrinho
  const toggleCart = () => {
    setShowCart(prevState => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
    });
    const data = await response.json();
    setNotification({ message: data.message, type: data.success ? 'success' : 'error' });
    if (data.success) {
        setIsLoggedIn(true);
        setFullName(data.fullName);
        toggleLogin();
    }
  };

  const handleRegister = async (e) => {
      e.preventDefault();
      const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, password, fullName, address })
      });
      const data = await response.json();
      setNotification({ message: data.message, type: data.success ? 'success' : 'error' });
      if (data.success) {
          setIsLoggedIn(true);
          setFullName(data.fullName);
          toggleLogin();
      }
  };

  

  return (
    <div className="App">
      <header className="App-header">
        <div className='profile-empresa' onClick={toggleInfo}>
          <img className='logo' src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/testing-logo-design-template-ce84480d61b3db9a8e1522a99875832f_screen.jpg?ts=1615794516' alt="Logo Empresa" />
          <p>Empresa</p>
        </div>

        {showInfo && (
          <div className='info-empresa'>
            <p>Local: Rua Exemplo, 123</p>
            <p>Status: Aberto</p>
          </div>
        )}

        {isLoggedIn ? (
          <p className="user-name"><CgProfile/> {fullName}</p>
        ) : (
          <button className="login-btn" onClick={toggleLogin}>Login/Cadastro</button>
        )}
        <Notification message={notification.message} type={notification.type} />
      </header>

      {/* Modal de Login/Cadastro */}
      {showLogin && (
        <div className="modal" onClick={toggleLogin}>
          <div className="login-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleLogin}>X</button>
            <h2>{isLogin ? "Login" : "Cadastro"}</h2>
            {isLogin ? (
              <form onSubmit={handleLogin}>
                <input type="tel" placeholder="Número de Telefone (com DDD)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="submit-btn" type="submit">Entrar</button>
                <p>Não tem uma conta? <span onClick={toggleForm} className="toggle-link">Cadastre-se</span></p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <input type="tel" placeholder="Número de Telefone (com DDD)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirme a senha" required />
                <input type="text" placeholder="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <h4>Endereço</h4>
                <input type="text" placeholder="Rua" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
                <input type="number" placeholder="Número" value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} required />
                <input type="text" placeholder="Bairro" value={address.neighborhood} onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })} required />
                <input type="text" placeholder="Complemento" value={address.complement} onChange={(e) => setAddress({ ...address, complement: e.target.value })} />
                <button className="submit-btn" type="submit">Cadastrar</button>
                <p>Já tem uma conta? <span onClick={toggleForm} className="toggle-link">Login</span></p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal do Carrinho */}
      {showCart && (
        <div className="modal" onClick={toggleCart}>
          <div className="cart-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleCart}>X</button>
            <h2>Carrinho de Compras</h2>
            <p>Aqui estarão os itens do carrinho.</p>
            {/* Adicione mais conteúdo do carrinho aqui */}
          </div>
        </div>
      )}

      <div className='content-produtos'>
        <ul className='lista-produtos'>
          <li onClick={toggleBurgers}>
            <h3 className='burger-title'>Hambúrgueres</h3>
            <img className='burger-img' alt='hambúrgueres' src='https://blog.milium.com.br/wp-content/uploads/2020/05/Banner-Blog-Post-Milium-Mai20-07-1-1024x366.jpg' />
            {showBurgers && (
              <div className='burger-list'>
                <ul>
                  <li>Cheeseburger</li>
                  <li>Bacon Burger</li>
                  <li>Veggie Burger</li>
                  <li>Duplo Burger</li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={toggleporcao}>
            <h3 className='porcao-title'>Porções</h3>
              <img className='porcao-img' alt='porções' src='https://speedy.uenicdn.com/632b60bb-dcd1-480f-a76f-8e3dc994e527/c528_a/image/upload/v1573233963/service_images/shutterstock_273398612.jpg' />
              {showPorcao && (
                <div className='porcao-list'>
                  <ul>
                    <li>Batata frita média (200g)</li>
                    <li>Batata frita grande (400g)</li>
                    <li>Batata rústica média (200g)</li>
                    <li>Batata rústica grande (400g)</li>
                  </ul>
                </div>
              )}
          </li>
          <li onClick={toggleDrinks}>
            <h3 className='drink-title'>Drinks</h3>
            <img className='drink-img' alt='bebidas' src='https://www.beerpassclub.com/wp-content/uploads/2023/11/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai-2048x1170.webp' />
            {showDrinks && (
              <div className='drink-list'>
                <ul>
                  <li>Caipirinha</li>
                  <li>Martini</li>
                  <li>Gin Tônica</li>
                  <li>Lagoa Azul</li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={toggleAgua}>
            <h3 className='agua-title'>Águas</h3>
            <img className='agua-img' alt='aguas' src='https://static.vecteezy.com/ti/fotos-gratis/p1/35426341-ai-gerado-vidro-garrafa-em-lago-agua-ai-gerado-frasco-brincar-foto.jpg'></img>
            {showAgua && (
              <div className='agua-list'>
                <ul>
                  <li>Água com gás</li>
                  <li>Água sem gás</li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={toggleRefri}>
            <h3 className='refri-title'>Refrigerantes</h3>
            <img className='refri-img' alt='refrigerantes' src='https://alloydeliveryimages.s3.sa-east-1.amazonaws.com/item_images/623a09047c199.webp'></img>
            {showRefri && (
              <div className='refri-list'>
                <ul>
                  <li>Coca-cola</li>
                  <li>Coca-cola Zero</li>
                  <li>Guaraná</li>
                  <li>Guaraná Zero</li>
                  <li>Pepsi</li>
                  <li>Pepsi Zero</li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>

      <footer>
        <button className="cart-btn" onClick={toggleCart}><FaShoppingCart /></button>
      </footer>
    </div>
  );
}

export default App;
