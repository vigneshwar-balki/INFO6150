import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { AttachMoney as AttachMoneyIcon, Business as BusinessIcon } from '@mui/icons-material';
import { setJobs, setLoading } from '../../store/store';

function JobListings() {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get('http://localhost:3000/jobs')
      .then((res) => {
        const fetched = res.data?.jobs || res.data || [];
        dispatch(setJobs(fetched));
      })
      .catch(() => dispatch(setJobs([])))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

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
          label={loading ? 'Loading…' : `${jobs.length} Open Positions`}
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
          Explore the latest openings and find the role that fits your skillset.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        )}

        {!loading && jobs.length === 0 && (
          <Alert
            severity="info"
            sx={{ backgroundColor: 'rgba(108,99,255,0.08)', color: '#8888aa', border: '1px solid rgba(108,99,255,0.2)' }}
          >
            No job listings found. An admin can add jobs from the Add Job page.
          </Alert>
        )}

        {!loading && jobs.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3,
            }}
          >
            {jobs.map((job, idx) => (
              <Card
                key={job._id || idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: '3px solid #6c63ff',
                  transition: 'all 200ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 0 24px rgba(108,99,255,0.25), -2px 0 12px rgba(108,99,255,0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Company + salary row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <BusinessIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem' }}>
                        {job.companyName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoneyIcon sx={{ fontSize: 13, color: '#00d4aa' }} />
                      <Typography variant="caption" sx={{ color: '#00d4aa', fontFamily: '"Space Mono", monospace', fontSize: '0.65rem' }}>
                        {job.salary}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
                    {job.jobTitle}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {job.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default JobListings;
