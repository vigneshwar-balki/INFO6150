import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Pets as PetsIcon, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { loginSuccess } from '../../store/store';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/user/getAll');
      const users = res.data?.users || res.data || [];
      const match = users.find((u) => u.email === form.email);
      if (match) {
        const userType = match.type || 'employee';
        localStorage.setItem('userEmail', form.email);
        localStorage.setItem('userType', userType);
        dispatch(loginSuccess({ user: form.email, type: userType }));
        if (userType === 'admin') {
          navigate('/admin/employees');
        } else {
          navigate('/jobs');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Unable to reach server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(108,99,255,0.12) 0%, transparent 60%), #0a0a0f',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(17,17,24,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          boxShadow: '0 0 40px rgba(108,99,255,0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,170,0.2))',
                border: '1px solid rgba(108,99,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <PetsIcon sx={{ color: '#6c63ff', fontSize: 26 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Space Mono", monospace',
              }}
            >
              JobRabbit
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Sign in to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(255,77,109,0.1)', color: '#ff8fa3' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': { backgroundColor: '#1a1a24' },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px #1a1a24 inset !important',
                  WebkitTextFillColor: '#f0f0ff !important',
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': { backgroundColor: '#1a1a24' },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px #1a1a24 inset !important',
                  WebkitTextFillColor: '#f0f0ff !important',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <LockOutlinedIcon />}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
