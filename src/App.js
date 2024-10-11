import React, { useState } from 'react';
import './App.css';
import Notification from './Notification';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from 'react-icons/fa';
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa";


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
  const [observations, setObservations] = useState({}); // Para observações do pedido

  // Estado para controlar a expansão do produto na lista
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);
  const [expandedPorcaoIndex, setExpandedPorcaoIndex] = useState(null);
  const [expandedDrinkIndex, setExpandedDrinkIndex] = useState(null);
  const [expandedAguaIndex, setExpandedAguaIndex] = useState(null);
  const [expandedRefriIndex, setExpandedRefriIndex] = useState(null);

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

  // Função para alternar entre login e cadastro
  const toggleForm = () => {
    setIsLogin(prevState => !prevState);
  };

  // Função para abrir o carrinho
  const toggleCart = () => {
    setShowCart(prevState => !prevState);
  };

  // Função para expandir/diminuir descricao do item
  const toggleItemDetails = (index) => {
    if (expandedItemIndex === index) {
      setExpandedItemIndex(null); // Fecha o item se ele já estiver aberto
    } else {
      setExpandedItemIndex(index); // Expande o item
    }
  };

  // Função para adicionar item ao carrinho
  const addItemToCart = (option) => {
    const newItem = { name: option.name, description: option.description, price: option.price }; // Cria um novo objeto com o nome do item
    setCartItems((prevItems) => [...prevItems, newItem]); // Adiciona o novo item ao carrinho
  };

  // Função para remover item ao carrinho
  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems); // Atualiza o estado do carrinho
  };

  const toggleCartDesc = (index) => {
    // Se o índice já está ativo, feche a descrição, senão, abra para o item clicado
    setActiveDescIndex(prevIndex => prevIndex === index ? null : index);
  };

  // Função para checar se está aberto (entre 18:00 e 22:00)
  const getStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
  
    // Verifica se a hora atual está entre 18:00 e 22:00
    if (currentHour >= 18 && currentHour < 22) {
      return (
        <p className='open'><FaDoorOpen /> Aberto </p>
      );
    } else {
      return (
        <p className='closed'><FaDoorClosed /> Fechado </p>
      );
    }
  };

  const handleObservationChange = (index, value) => {
    setObservations((prevObservations) => ({
      ...prevObservations,
      [index]: value, // Atualiza apenas o item correspondente
    }));
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
  
  // Produtos:
  const items = [
    {
      category: 'porcao',
      name: 'Porções',
      imgSrc: 'https://speedy.uenicdn.com/632b60bb-dcd1-480f-a76f-8e3dc994e527/c528_a/image/upload/v1573233963/service_images/shutterstock_273398612.jpg',
      options: [
        {
          name: 'Batata frita média (200g)',
          description: 'Uma porção de batata frita crocante de 200g.',
          price: '10,00',
        },
        {
          name: 'Batata frita grande (400g)',
          description: 'Uma porção de batata frita crocante de 400g.',
          price: '18,00',
        },
        {
          name: 'Batata rústica média (200g)',
          description: 'Batata rústica assada e temperada, porção de 200g.',
          price: '12,00',
        },
        {
          name: 'Batata rústica grande (400g)',
          description: 'Batata rústica assada e temperada, porção de 400g.',
          price: '20,00',
        },
      ],
    },
    {
      category: 'drink',
      name: 'Drinks',
      imgSrc: 'https://www.beerpassclub.com/wp-content/uploads/2023/11/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai-2048x1170.webp',
      options: [
        {
          name: 'Caipirinha',
          description: 'Caipirinha tradicional feita com limão e cachaça.',
          price: '15,00',
        },
        {
          name: 'Martini',
          description: 'Drink clássico feito com gin e vermute.',
          price: '22,00',
        },
        {
          name: 'Gin Tônica',
          description: 'Drink refrescante feito com gin e água tônica.',
          price: '20,00',
        },
        {
          name: 'Lagoa Azul',
          description: 'Drink doce e colorido com curaçau azul.',
          price: '18,00',
        },
      ],
    },
    {
      category: 'agua',
      name: 'Águas',
      imgSrc: 'https://static.vecteezy.com/ti/fotos-gratis/p1/35426341-ai-gerado-vidro-garrafa-em-lago-agua-ai-gerado-frasco-brincar-foto.jpg',
      options: [
        {
          name: 'Água com gás',
          description: 'Água mineral com gás, garrafa de 500ml.',
          price: '5,00',
        },
        {
          name: 'Água sem gás',
          description: 'Água mineral sem gás, garrafa de 500ml.',
          price: '4,00',
        },
      ],
    },
    {
      category: 'refri',
      name: 'Refrigerantes',
      imgSrc: 'https://alloydeliveryimages.s3.sa-east-1.amazonaws.com/item_images/623a09047c199.webp',
      options: [
        {
          name: 'Coca-cola',
          description: 'Refrigerante Coca-cola, lata de 350ml.',
          price: '6,00',
        },
        {
          name: 'Coca-cola Zero',
          description: 'Refrigerante Coca-cola Zero, lata de 350ml.',
          price: '6,00',
        },
        {
          name: 'Guaraná',
          description: 'Refrigerante Guaraná, lata de 350ml.',
          price: '5,00',
        },
        {
          name: 'Guaraná Zero',
          description: 'Refrigerante Guaraná Zero, lata de 350ml.',
          price: '5,00',
        },
        {
          name: 'Pepsi',
          description: 'Refrigerante Pepsi, lata de 350ml.',
          price: '6,00',
        },
        {
          name: 'Pepsi Zero',
          description: 'Refrigerante Pepsi Zero, lata de 350ml.',
          price: '6,00',
        },
      ],
    },
  ];
  
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='profile-empresa' onClick={toggleInfo}>
          <div className='profile-logo-title'>
          <img className='logo' src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/testing-logo-design-template-ce84480d61b3db9a8e1522a99875832f_screen.jpg?ts=1615794516' alt="Logo Empresa" />
          <p className='profile-nome'>DaleDelivery</p>
          </div>
          <div className="status">
            {getStatus()}
          </div>
        </div>

        {showInfo && (
          <div className='info-empresa'>
            <p>Endereço: Rua Exemplo, 123</p>
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
                    <button 
                      className='exclude-item-btn' 
                      onClick={(e) => {
                        e.stopPropagation(); // Impede a propagação do clique para a div
                        handleRemoveItem(index);
                      }}
                    >
                      X
                    </button>
                    <li className="cart-li">{item.name}</li>
                    <div className='cart-preco'>{item.price}</div> {/* Formata o preço */}
                    {activeDescIndex === index && (
                      <p className='cart-desc'>{item.description}</p>
                    )}
                  </div>
                ))}
                <div className='cart-gotopaydiv'>
                  <button className='cart-gotopaybtn' onClick={togglePaymentModal}>
                    <strong>Ir para pagamento</strong>
                  </button>
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

            {/* Lista de Itens no Carrinho */}
            <ul className="payment-item-list">
              {cartItems.map((item, index) => (
                <li className="payment-item" key={index}>
                  <div className="payment-item-name">{item.name}</div>
                  {/* Exibindo o preço corretamente */}
                  <div className="payment-item-price">R$ {parseFloat(item.price).toFixed(2)}</div>
                  <label htmlFor={`observations-${index}`} className="payment-label">
                    Observações do pedido:
                  </label>
                  <textarea
                    id={`observations-${index}`}
                    className="payment-observations"
                    value={observations[index] || ""} // Exibe a observação correspondente ou vazio
                    onChange={(e) => handleObservationChange(index, e.target.value)}
                    placeholder="Digite as observações desejadas para o pedido"
                  ></textarea>
                </li>
              ))}
            </ul>

            {/* Detalhes do Pagamento */}
            <div className="payment-details">
              <p className="payment-freight">Frete: R$ 7.00</p>

              {/* Calcula o total dos itens no carrinho + frete */}
              <p className="payment-total">
                Total: R$ {(
                  cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0) + 7
                ).toFixed(2)}
              </p>
            </div>

            {/* Botões de opções de pagamento com ícones */}
            <div className="payment-options">
              <h3>Escolha a forma de pagamento:</h3>
              <div className="payment-btn-group">
                <button className="payment-option-btn">
                  <FaMoneyBillWave size={24} /> Dinheiro
                </button>
                <button className="payment-option-btn">
                  <FaCreditCard size={24} /> Cartão de crédito/débito
                </button>
                <button className="payment-option-btn">
                  <FaQrcode size={24} /> Pix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='content-produtos'>
        <ul className='lista-produtos'>
          {items.map((item, index) => (
            <li key={index} onClick={() => toggleItemDetails(index)}>
              <h3 className={`${item.category}-title`}>{item.name}</h3>
              <img className={`${item.category}-img`} alt={item.category} src={item.imgSrc} />
              {expandedItemIndex === index && (
                <div className={`${item.category}-list`}>
                  <ul onClick={(e) => e.stopPropagation()}>
                    {item.options.map((option, i) => (
                      <li key={i}>
                        <div className='item-div-nome-desc'>
                        <h4 className='item-nome'>{option.name}</h4>
                        <p className='item-desc'>{option.description}</p>
                        </div>
                        <p className='item-preco'>R$ {option.price}</p>
                        <button className='addtocartbtn' onClick={() => addItemToCart(option)}>Adicionar ao Carrinho</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <button className="cart-btn" onClick={toggleCart}><FaShoppingCart /></button>
      </footer>
    </div>
  );
}

export default App;
