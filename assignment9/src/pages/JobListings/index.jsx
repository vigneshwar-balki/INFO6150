import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { OpenInNew as OpenInNewIcon, AccessTime as AccessTimeIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

const jobs = [
  {
    id: 1,
    title: 'Full Stack Developer',
    description: 'Join our dynamic team to work on cutting-edge technologies.',
    lastUpdated: 'Last updated 2 days ago',
    salary: '$95k – $130k / yr',
    skills: ['React', 'Node.js', 'MongoDB'],
    applyLink: 'https://example.com/apply/full-stack-developer',
  },
  {
    id: 2,
    title: 'Digital Marketing Specialist',
    description: 'Elevate our digital marketing strategies.',
    lastUpdated: 'Last updated 1 day ago',
    salary: '$70k – $95k / yr',
    skills: ['SEO', 'Google Ads', 'Analytics'],
    applyLink: 'https://example.com/apply/digital-marketing-specialist',
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    description: 'Shape engaging user experiences.',
    lastUpdated: 'Last updated 4 hours ago',
    salary: '$85k – $115k / yr',
    skills: ['Figma', 'Prototyping', 'CSS'],
    applyLink: 'https://example.com/apply/ux-ui-designer',
  },
  {
    id: 4,
    title: 'Data Scientist',
    description: 'Leverage advanced analytics and machine learning.',
    lastUpdated: 'Last updated 3 days ago',
    salary: '$110k – $150k / yr',
    skills: ['Python', 'TensorFlow', 'SQL'],
    applyLink: 'https://example.com/apply/data-scientist',
  },
  {
    id: 5,
    title: 'Customer Support Representative',
    description: 'Deliver unparalleled customer service.',
    lastUpdated: 'Last updated 6 hours ago',
    salary: '$45k – $65k / yr',
    skills: ['Zendesk', 'Communication', 'CRM'],
    applyLink: 'https://example.com/apply/customer-support-representative',
  },
  {
    id: 6,
    title: 'Project Manager',
    description: 'Guide and coordinate project teams.',
    lastUpdated: 'Last updated 1 week ago',
    salary: '$90k – $125k / yr',
    skills: ['Agile', 'Jira', 'Scrum'],
    applyLink: 'https://example.com/apply/project-manager',
  },
];

function JobListings() {
  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(108,99,255,0.12) 0%, transparent 60%), #0a0a0f',
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Chip
          label={`${jobs.length} Open Positions`}
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
          Job Listings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Explore our latest openings and find the role that fits your skillset.
        </Typography>
      </Box>

      {/* Jobs Grid */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: '3px solid #6c63ff',
                  transition: 'all 200ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderLeftColor: '#6c63ff',
                    boxShadow: '0 0 24px rgba(108,99,255,0.25), -2px 0 12px rgba(108,99,255,0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Badge row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                      label={`#${String(job.id).padStart(3, '0')}`}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(108,99,255,0.18)',
                        color: '#6c63ff',
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        border: '1px solid rgba(108,99,255,0.35)',
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoneyIcon sx={{ fontSize: 13, color: '#00d4aa' }} />
                      <Typography
                        variant="caption"
                        sx={{ color: '#00d4aa', fontFamily: '"Space Mono", monospace', fontSize: '0.65rem' }}
                      >
                        {job.salary}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                    {job.description}
                  </Typography>

                  {/* Skill tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                    {job.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(0,212,170,0.1)',
                          color: '#00d4aa',
                          border: '1px solid rgba(0,212,170,0.25)',
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.62rem',
                          height: 22,
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', fontFamily: '"Space Mono", monospace' }}
                    >
                      {job.lastUpdated}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default JobListings;
