import {useState} from "react";

export default function Login({onLogin}){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]=useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            const res = await fetch("http://localhost:8080/api/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();

            if (data.success){
                onLogin(username);
            }else{
                setError(data.error || "Credenciais inválidas");
            }
        }catch(error){
            setError("Error de conexão com o servidor local");
        }
    };

return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">🔐 Mini Cloud Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </div>
    </div>
    );
}