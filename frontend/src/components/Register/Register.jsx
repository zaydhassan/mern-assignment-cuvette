import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
