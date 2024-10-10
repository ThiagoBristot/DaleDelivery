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

  // Estado para o carrinho
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeDescIndex, setActiveDescIndex] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [observations, setObservations] = useState(''); // Para observações do pedido

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

  // Função para adicionar item ao carrinho
  const addItemToCart = (itemName) => {
    const newItem = { name: itemName }; // Cria um novo objeto com o nome do item
    setCartItems((prevItems) => [...prevItems, newItem]); // Adiciona o novo item ao carrinho
  };

  const toggleCartDesc = (index) => {
    // Se o índice já está ativo, feche a descrição, senão, abra para o item clicado
    setActiveDescIndex(prevIndex => prevIndex === index ? null : index);
  };

  const togglePaymentModal = () => setShowPaymentModal(!showPaymentModal);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
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
    const response = await fetch('http://localhost:5000/api/register', {
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
      </header>

      {/* Modal de Login/Cadastro */}
      {showLogin && (
        <div className="modal" onClick={toggleLogin}>
          <div className="login-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleLogin}>X</button>
            <h2>{isLogin ? "Login" : "Cadastro"}</h2>
            {isLogin ? (
              <form onSubmit={handleLogin}>
                <Notification message={notification.message} type={notification.type} />
                <input type="tel" placeholder="Número de Telefone (com DDD)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="submit-btn" type="submit">Entrar</button>
                <p>Não tem uma conta? <span onClick={toggleForm} className="toggle-link">Cadastre-se</span></p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <Notification message={notification.message} type={notification.type} />
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
            <h2 className="cart-title">Carrinho de Compras</h2>
            {cartItems.length > 0 ? (
              <ul className="cart-list">
                {cartItems.map((item, index) => (
                  <div className='cart-item' key={index} onClick={() => toggleCartDesc(index)}>
                    <li className="cart-li">{item.name}</li>
                    <div className='cart-preco'>preco</div>
                    {activeDescIndex === index && (
                      <p className='cart-desc'>descricao</p>
                    )}
                  </div>
                ))}
                <div className='cart-gotopaydiv'>
                <button className='cart-gotopaybtn' onClick={togglePaymentModal}><strong>Ir para pagamento</strong></button>
                </div>
              </ul>
            ) : (
              <p className="cart-message">Adicione os itens desejados ao carrinho.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <div className="modal" onClick={togglePaymentModal}>
          <div className="payment-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={togglePaymentModal}>X</button>
            <h2 className="payment-title">Tela de Pagamento</h2>
            <ul className="payment-item-list">
              {cartItems.map((item, index) => (
                <li className="payment-item" key={index}>
                  {item.name} - {item.price} R$
                  <label htmlFor="observations" className="payment-label">Observações do pedido:</label>
                    <textarea
                      id="observations"
                      className="payment-observations"
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      placeholder="Digite as observações desejadas para o pedido"
                    ></textarea>
                </li>
              ))}
            </ul>

            <div className="payment-details">
              <p className="payment-freight">Frete: R$ 15.00</p>
              <p className="payment-total">Total: R$ 100.00</p>
            </div>
            <div className='payment-div-chooseoption'>
              <button className='payment-chooseoption'>Escolher forma de pagamento</button>
            </div>
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
                <ul onClick={(e) => e.stopPropagation()}>
                  <li onClick={() => addItemToCart('Cheeseburger')}>Cheeseburger</li>
                  <li onClick={() => addItemToCart('Hambúrguer Vegano')}>Hambúrguer Vegano</li>
                  <li onClick={() => addItemToCart('Hambúrguer de Frango')}>Hambúrguer de Frango</li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={toggleporcao}>
            <h3 className='porcao-title'>Porções</h3>
              <img className='porcao-img' alt='porções' src='https://speedy.uenicdn.com/632b60bb-dcd1-480f-a76f-8e3dc994e527/c528_a/image/upload/v1573233963/service_images/shutterstock_273398612.jpg' />
              {showPorcao && (
                <div className='porcao-list'>
                  <ul onClick={(e) => e.stopPropagation()}>
                    <li onClick={() => addItemToCart('Batata frita média (200g)')}>Batata frita média (200g)</li>
                    <li onClick={() => addItemToCart('Batata frita grande (400g)')}>Batata frita grande (400g)</li>
                    <li onClick={() => addItemToCart('Batata rústica média (200g)')}>Batata rústica média (200g)</li>
                    <li onClick={() => addItemToCart('Batata rústica grande (400g)')}>Batata rústica grande (400g)</li>
                  </ul>
                </div>
              )}
          </li>
          <li onClick={toggleDrinks}>
            <h3 className='drink-title'>Drinks</h3>
            <img className='drink-img' alt='bebidas' src='https://www.beerpassclub.com/wp-content/uploads/2023/11/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai-2048x1170.webp' />
            {showDrinks && (
              <div className='drink-list'>
                <ul onClick={(e) => e.stopPropagation()}>
                  <li onClick={() => addItemToCart('Caipirinha')}>Caipirinha</li>
                  <li onClick={() => addItemToCart('Martini')}>Martini</li>
                  <li onClick={() => addItemToCart('Gin Tônica')}>Gin Tônica</li>
                  <li onClick={() => addItemToCart('Lagoa Azul')}>Lagoa Azul</li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={toggleAgua}>
            <h3 className='agua-title'>Águas</h3>
            <img className='agua-img' alt='aguas' src='https://static.vecteezy.com/ti/fotos-gratis/p1/35426341-ai-gerado-vidro-garrafa-em-lago-agua-ai-gerado-frasco-brincar-foto.jpg'></img>
            {showAgua && (
              <div className='agua-list'>
                <ul onClick={(e) => e.stopPropagation()}>
                  <li onClick={() => addItemToCart('Água com gás')}>Água com gás</li>
                  <li onClick={() => addItemToCart('Água sem gás')}>Água sem gás</li>
                </ul>
              </div>
            )}
          </li>
          <li onClick={toggleRefri}>
            <h3 className='refri-title'>Refrigerantes</h3>
            <img className='refri-img' alt='refrigerantes' src='https://alloydeliveryimages.s3.sa-east-1.amazonaws.com/item_images/623a09047c199.webp'></img>
            {showRefri && (
              <div className='refri-list'>
                <ul onClick={(e) => e.stopPropagation()}>
                  <li onClick={() => addItemToCart('Coca-cola')}>Coca-cola</li>
                  <li onClick={() => addItemToCart('Coca-cola Zero')}>Coca-cola Zero</li>
                  <li onClick={() => addItemToCart('Guaraná')}>Guaraná</li>
                  <li onClick={() => addItemToCart('Guaraná Zero')}>Guaraná Zero</li>
                  <li onClick={() => addItemToCart('Pepsi')}>Pepsi</li>
                  <li onClick={() => addItemToCart('Pepsi Zero')}>Pepsi Zero</li>
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
