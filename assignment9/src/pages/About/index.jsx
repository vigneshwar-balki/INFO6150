import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { RocketLaunch as RocketLaunchIcon, Handshake as HandshakeIcon, Verified as VerifiedIcon, AutoAwesome as AutoAwesomeIcon, Groups as GroupsIcon } from '@mui/icons-material';

const values = [
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 36, color: '#6c63ff' }} />,
    title: 'Our Mission',
    body: 'To bridge the gap between exceptional talent and innovative companies, making meaningful career connections accessible to everyone.',
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 36, color: '#00d4aa' }} />,
    title: 'Our Vision',
    body: 'A world where every professional finds work that is fulfilling, well-compensated, and aligned with their values and ambitions.',
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 36, color: '#6c63ff' }} />,
    title: 'Trust & Safety',
    body: 'Every listing is vetted. Every company is verified. We maintain the highest standards so you can apply with confidence.',
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 36, color: '#00d4aa' }} />,
    title: 'Innovation First',
    body: 'We use modern technology to match candidates with roles that fit not just their skills, but their career trajectory and culture preferences.',
  },
];

function About() {
  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>

      {/* Hero */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,212,170,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(108,99,255,0.1) 0%, transparent 50%), #0a0a0f',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Chip
          label="About Us"
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
          variant="h1"
          sx={{
            fontSize: { xs: '2.4rem', md: '4rem', lg: '4.5rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            mb: 3,
          }}
        >
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #f0f0ff 30%, #8888aa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About{' '}
          </Box>
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            JobPortal
          </Box>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 580, mx: 'auto', fontWeight: 400, lineHeight: 1.75 }}
        >
          Built to make the job search experience smarter, faster, and more human.
          We believe the right opportunity can change everything.
        </Typography>
      </Box>

      <Container maxWidth="lg">

        {/* Values 2×2 grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
          }}
        >
          {values.map((v) => (
            <Card
              key={v.title}
              sx={{
                borderLeft: '3px solid #6c63ff',
                transition: 'all 200ms ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 0 24px rgba(108,99,255,0.2), -2px 0 12px rgba(108,99,255,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Box sx={{ mb: 2 }}>{v.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                  {v.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {v.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Team / Story panel */}
        <Box
          sx={{
            mt: 6,
            p: { xs: 3.5, md: 5 },
            background: 'linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,212,170,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <GroupsIcon sx={{ color: '#6c63ff', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              The Team Behind JobPortal
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 3 }} />

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            A platform built to connect job seekers with the right opportunities. Simple, fast, and human.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}

export default About;
