import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { Add as AddIcon } from '@mui/icons-material';

const emptyForm = { companyName: '', jobTitle: '', description: '', salary: '' };

function AddJobPage() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = 'Company name is required.';
    if (!form.jobTitle.trim())    e.jobTitle    = 'Job title is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (!form.salary.trim())      e.salary      = 'Salary is required.';
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setSuccess(false);
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/create/job', form);
      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setApiError(err.response?.data?.error || 'Failed to create job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 60% 20%, rgba(108,99,255,0.12) 0%, transparent 60%), #0a0a0f',
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
          Add a Job
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Post a new job listing to the platform.
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card
          sx={{
            borderLeft: '3px solid #6c63ff',
            boxShadow: '0 0 30px rgba(108,99,255,0.08)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {success && (
              <Alert
                severity="success"
                sx={{ mb: 3, backgroundColor: 'rgba(0,212,170,0.1)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
              >
                Job added successfully!
              </Alert>
            )}
            {apiError && (
              <Alert
                severity="error"
                sx={{ mb: 3, backgroundColor: 'rgba(255,77,109,0.1)', color: '#ff8fa3' }}
              >
                {apiError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  error={Boolean(errors.companyName)}
                  helperText={errors.companyName}
                />
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  error={Boolean(errors.jobTitle)}
                  helperText={errors.jobTitle}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                />
                <TextField
                  fullWidth
                  label="Salary"
                  name="salary"
                  placeholder="e.g. $90k – $120k / yr"
                  value={form.salary}
                  onChange={handleChange}
                  error={Boolean(errors.salary)}
                  helperText={errors.salary}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
                    sx={{ px: 4 }}
                  >
                    {submitting ? 'Adding...' : 'Add Job'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AddJobPage;
