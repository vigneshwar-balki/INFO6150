import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function CompanyShowcase() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/user/getAll')
      .then((res) => {
        const all = res.data?.users || res.data || [];
        const withImages = all.filter((u) => u.imagePath);
        setUsers(withImages);
      })
      .catch(() => setError('Failed to load company data. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(0,212,170,0.1) 0%, transparent 60%), #0a0a0f',
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Chip
          label="Our Network"
          size="small"
          sx={{
            mb: 3,
            backgroundColor: 'rgba(0,212,170,0.12)',
            color: '#00d4aa',
            border: '1px solid rgba(0,212,170,0.3)',
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
          Company Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Meet the people and companies in our network.
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

        {!loading && !error && users.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography color="text.secondary">
              No users with profile images found.
            </Typography>
          </Box>
        )}

        {!loading && users.length > 0 && (
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} key={user._id || user.email}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    borderLeft: '3px solid #6c63ff',
                    transition: 'all 200ms ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 0 24px rgba(108,99,255,0.2), -2px 0 12px rgba(108,99,255,0.15)',
                    },
                  }}
                >
                  {/* Image — left panel, fixed width */}
                  <Box
                    component="img"
                    src={`http://localhost:3000${user.imagePath}`}
                    alt={user.fullName}
                    onError={(e) => { e.target.style.display = 'none'; }}
                    sx={{
                      width: 160,
                      flexShrink: 0,
                      objectFit: 'cover',
                      borderRight: '1px solid rgba(255,255,255,0.08)',
                    }}
                  />

                  {/* Right — info */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      p: 3,
                      flexGrow: 1,
                      minWidth: 0,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        mb: 1.5,
                        background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      {user.fullName?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {user.fullName}
                    </Typography>

                    {user.email && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontFamily: '"Space Mono", monospace',
                          display: 'block',
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {user.email}
                      </Typography>
                    )}

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        borderColor: 'rgba(108,99,255,0.4)',
                        color: '#6c63ff',
                        fontSize: '0.75rem',
                        py: 0.5,
                        px: 1.5,
                        '&:hover': {
                          borderColor: '#6c63ff',
                          backgroundColor: 'rgba(108,99,255,0.08)',
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default CompanyShowcase;
