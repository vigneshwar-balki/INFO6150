import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { Send as SendIcon, Email as EmailIcon, LocationOn as LocationOnIcon, Phone as PhoneIcon } from '@mui/icons-material';

const contactInfo = [
  { icon: <EmailIcon sx={{ color: '#6c63ff', fontSize: 20 }} />, label: 'Email', value: 'hello@jobportal.dev' },
  { icon: <LocationOnIcon sx={{ color: '#00d4aa', fontSize: 20 }} />, label: 'Location', value: 'Boston, MA, USA' },
  { icon: <PhoneIcon sx={{ color: '#6c63ff', fontSize: 20 }} />, label: 'Phone', value: '+1 (617) 555-0100' },
];

function Contact() {
  const [form, setForm] = useState({ fullName: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setForm({ fullName: '', email: '', message: '' });
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'radial-gradient(ellipse at 40% 30%, rgba(108,99,255,0.12) 0%, transparent 60%), #0a0a0f',
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
          textAlign: 'center',
          px: 2,
        }}
      >
        <Chip
          label="Get In Touch"
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
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Have a question or want to partner with us? We'd love to hear from you.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4} alignItems="flex-start">

          {/* Left — contact info panel */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                background: 'linear-gradient(160deg, rgba(108,99,255,0.08), rgba(0,212,170,0.06))',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                p: 3.5,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Reach us at
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                We typically respond within one business day.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {contactInfo.map((item, idx) => (
                  <Box key={item.label}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontFamily: '"Space Mono", monospace',
                            display: 'block',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                    {idx < contactInfo.length - 1 && (
                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right — form */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {submitted ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Alert
                      severity="success"
                      sx={{
                        backgroundColor: 'rgba(0,212,170,0.1)',
                        color: '#00d4aa',
                        border: '1px solid rgba(0,212,170,0.3)',
                        mb: 2,
                        justifyContent: 'center',
                      }}
                    >
                      Message sent successfully! We'll get back to you soon.
                    </Alert>
                    <Button
                      variant="outlined"
                      onClick={() => setSubmitted(false)}
                      sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'text.secondary' }}
                    >
                      Send another message
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                      Send a Message
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          error={Boolean(errors.fullName)}
                          helperText={errors.fullName}
                          autoComplete="name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          error={Boolean(errors.email)}
                          helperText={errors.email}
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          error={Boolean(errors.message)}
                          helperText={errors.message}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          endIcon={<SendIcon />}
                          sx={{ px: 4 }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
