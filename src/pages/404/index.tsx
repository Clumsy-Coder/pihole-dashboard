import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Page404 = () => (
  <Grid
    container
    justifyContent='center'
    alignItems='center'
    style={{ height: '80vh' }} /* Push vertically to center */
  >
    <Box textAlign='center'>
      <Typography variant='h1'>404</Typography>
    </Box>
  </Grid>
);

export default Page404;
