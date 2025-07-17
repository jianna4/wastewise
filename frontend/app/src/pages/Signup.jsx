import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup =()=>{
    const [form , setForm] = useState({email: '',password: ''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/register/',form);
        navigate('/login');
    };

    return(
        
    <form style={{ height: "500px",marginTop: '100px' }}onSubmit={handleSubmit}>
        
        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
        <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button>Sign up</button>
    </form>
);
}
export default Signup;