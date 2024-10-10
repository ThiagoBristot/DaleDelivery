import React, { useState } from 'react';

const LoginForm = ({ showLogin, toggleLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Login e Cadastro
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const key = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [key]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? '/api/login' : '/api/register'; // URL do backend

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Processar login/cadastro bem-sucedido
        console.log(data);
        // Aqui você pode redirecionar ou atualizar o estado conforme necessário
      } else {
        // Tratar erro
        console.error(data);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      phone: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      address: {
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
      },
    });
  };

  return (
    <>
      {showLogin && (
        <div className="modal" onClick={toggleLogin}>
          <div className="login-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleLogin}>X</button>
            <h2>{isLogin ? "Login" : "Cadastro"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                name="phone"
                placeholder="Número de Telefone (com DDD)"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {!isLogin && (
                <>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nome Completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <h4>Endereço</h4>
                  <input
                    type="text"
                    name="address.street"
                    placeholder="Rua"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="address.number"
                    placeholder="Número"
                    value={formData.address.number}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="address.neighborhood"
                    placeholder="Bairro"
                    value={formData.address.neighborhood}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="address.complement"
                    placeholder="Complemento"
                    value={formData.address.complement}
                    onChange={handleChange}
                  />
                </>
              )}
              <button type="submit" className="submit-btn">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
              <p>
                {isLogin ? (
                  <>Não tem uma conta? <span onClick={toggleForm} className="toggle-link">Cadastre-se</span></>
                ) : (
                  <>Já tem uma conta? <span onClick={toggleForm} className="toggle-link">Login</span></>
                )}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
