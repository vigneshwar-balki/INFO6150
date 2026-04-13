import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { ArrowForward as ArrowForwardIcon, WorkOutlined as WorkOutlineIcon, PeopleOutlined as PeopleOutlineIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';

const stats = [
  { icon: <WorkOutlineIcon sx={{ fontSize: 32, color: '#6c63ff' }} />, value: '500+', label: 'Active Jobs' },
  { icon: <PeopleOutlineIcon sx={{ fontSize: 32, color: '#00d4aa' }} />, value: '10K+', label: 'Registered Users' },
  { icon: <TrendingUpIcon sx={{ fontSize: 32, color: '#6c63ff' }} />, value: '95%', label: 'Success Rate' },
];

function Home() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Hero */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.15) 0%, transparent 70%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Chip
          label="Now Hiring — Spring 2025"
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
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            mb: 3,
            background: 'linear-gradient(135deg, #f0f0ff 0%, #8888aa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Find Your{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dream Career
          </Box>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 560, mx: 'auto', mb: 5, lineHeight: 1.7, fontWeight: 400 }}
        >
          Connect with top companies, explore curated opportunities, and take
          the next step in your professional journey.
        </Typography>
        {userEmail && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Welcome back, <Box component="span" sx={{ color: 'primary.main' }}>{userEmail}</Box>
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/jobs')}
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Jobs
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/companies')}
            sx={{
              px: 4,
              py: 1.5,
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'text.secondary',
              '&:hover': { borderColor: 'primary.main', color: 'text.primary' },
            }}
          >
            View Companies
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 } }}>
        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Card sx={{ textAlign: 'center', p: 1 }}>
                <CardContent>
                  {stat.icon}
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, color: 'text.primary' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
