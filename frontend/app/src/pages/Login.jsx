import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../apis/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://127.0.0.1:8000/api/login/', form);
    login(res.data.access);
    navigate('/book');

  };
  const handleLogin = (e) => {
  e.preventDefault();
  console.log("Login button clicked ✅");
};
console.log("Login component loaded ✅");

  return (
    <div class="bg-blue-400" >
    <form class="bg-gray"style={{ height: "500px",marginTop: '100px' }} onSubmit={handleSubmit}>
      <input class="bg-gray" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
     <button type="submit">Login</button>

    </form>
    
    </div>
    
    
  );
};

export default Login;
