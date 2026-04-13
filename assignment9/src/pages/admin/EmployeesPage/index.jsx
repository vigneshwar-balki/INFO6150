import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function EmployeesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/user/getAll')
      .then((res) => {
        const all = res.data?.users || res.data || [];
        setUsers(all);
      })
      .catch(() => setError('Failed to load employees. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.12) 0%, transparent 60%), #0a0a0f',
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Chip
          label="Admin Panel"
          size="small"
          sx={{
            mb: 3,
            backgroundColor: 'rgba(108,99,255,0.15)',
            color: '#6c63ff',
            border: '1px solid rgba(108,99,255,0.3)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #f0f0ff, #8888aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Employees
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All registered users in the system.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ backgroundColor: 'rgba(255,77,109,0.1)', color: '#ff8fa3', mb: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: '#111118',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: 'linear-gradient(90deg, rgba(108,99,255,0.25), rgba(108,99,255,0.1))',
                  }}
                >
                  <TableCell sx={{ color: '#f0f0ff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: '"Space Mono", monospace', fontSize: '0.8rem' }}>
                    Full Name
                  </TableCell>
                  <TableCell sx={{ color: '#f0f0ff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: '"Space Mono", monospace', fontSize: '0.8rem' }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: '#f0f0ff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: '"Space Mono", monospace', fontSize: '0.8rem' }}>
                    Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ color: 'text.secondary', py: 6, border: 'none' }}>
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user, idx) => (
                    <TableRow
                      key={user._id || user.email}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                        '&:hover': { backgroundColor: 'rgba(108,99,255,0.06)' },
                        '&:last-child td': { border: 'none' },
                      }}
                    >
                      <TableCell sx={{ color: '#f0f0ff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {user.fullName}
                      </TableCell>
                      <TableCell sx={{ color: '#8888aa', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: '"Space Mono", monospace', fontSize: '0.8rem' }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Chip
                          label={user.type || '—'}
                          size="small"
                          sx={{
                            backgroundColor: user.type === 'admin'
                              ? 'rgba(108,99,255,0.18)'
                              : 'rgba(0,212,170,0.12)',
                            color: user.type === 'admin' ? '#6c63ff' : '#00d4aa',
                            border: `1px solid ${user.type === 'admin' ? 'rgba(108,99,255,0.35)' : 'rgba(0,212,170,0.3)'}`,
                            fontFamily: '"Space Mono", monospace',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}

export default EmployeesPage;
