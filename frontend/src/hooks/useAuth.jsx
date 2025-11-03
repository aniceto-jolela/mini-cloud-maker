import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está logado no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simular login - na prática, você faria uma requisição API
    setLoading(true);
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 1,
        name: 'João Silva',
        email: credentials.email,
        plan: 'free', // free, basic, pro, enterprise
        modules: ['oficina', 'backup'] // módulos ativos
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Credenciais inválidas' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        plan: 'free',
        modules: ['oficina'] // módulo gratuito
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro no cadastro' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const upgradePlan = async (order) => {
  setLoading(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedUser = {
      ...user,
      plan: 'paid',
      license: {
        type: order.model,
        modules: order.modules,
        support: order.support,
        implementation: order.implementation,
        purchaseDate: new Date().toISOString(),
        totalPaid: order.total
      },
      modules: getModulesForOrder(order)
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro no processamento do pedido' };
  } finally {
    setLoading(false);
  }
};

const getModulesForOrder = (order) => {
  let modules = ['oficina']; // Sempre inclui o módulo oficina
  
  if (order.model === 'COMPLETE') {
    modules = ['oficina', 'studio', 'backup', 'files'];
  } else if (order.model === 'MODULAR') {
    modules = [...modules, ...order.modules];
  } else if (order.model === 'ENTERPRISE') {
    modules = ['oficina', 'studio', 'backup', 'files', 'enterprise'];
  }
  
  return modules;
};

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      upgradePlan
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}