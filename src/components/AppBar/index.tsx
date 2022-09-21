import { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import MenuIcon from '@mui/icons-material/Menu';

import Drawer, { drawerWidth } from '@components/Drawer';
import Link from '@components/Link';
import { useGetAuthSessionQuery } from '@redux/AuthSession';

// import { pageLinks, IpageLinks } from '@utils/pageLinks';

// const renderToolbarLinks = () => {
//   const { about, githubRepo } = pageLinks;
//   const appBarLinks: IpageLinks[] = [about, githubRepo];

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} />
//       <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
//         {/* eslint-disable-next-line object-curly-newline */}
//         {appBarLinks.map(({ linkName, url, icon }) => (
//           <Link key={linkName} href={url} rel='noreferrer' color='#fff'>
//             <Tooltip key={linkName} title={linkName}>
//               <IconButton key={linkName} size='large' color='inherit'>
//                 {icon}
//               </IconButton>
//             </Tooltip>
//           </Link>
//         ))}
//       </Box>
//     </>
//   );
// };

/**
 * Appbar used for navigating to different pages.
 * Also used for searching problems and users
 */
const AppBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { data = { ipAddress: '', port: '' }, isLoading = true } = useGetAuthSessionQuery();

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }} component='nav'>
      <MuiAppBar
        position='fixed'
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {/* app drawer */}
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2, display: { sm: 'block', lg: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* ---------------------------------------------------------------------------------- */}
          <Link
            href='/'
            variant='h6'
            noWrap
            // sx={{ display: { xs: 'block' } }}
            color='#fff'
          >
            Pi-Hole
          </Link>
          {/* ---------------------------------------------------------------------------------- */}
          {/* {renderToolbarLinks} */}
          {/* ---------------------------------------------------------------------------------- */}
          {/* Display Ip address and port number if user is Authenticated */}
          <>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: !isLoading && data.ipAddress.length ? 'flex' : 'none' } }}>
              <Tooltip title='Pi-Hole IP address and port'>
                <Chip label={`Pi-Hole: ${data.ipAddress}:${data.port}`} />
              </Tooltip>
            </Box>
          </>
          {/* ---------------------------------------------------------------------------------- */}
        </Toolbar>
      </MuiAppBar>
      {/* ---------------------------------------------------------------------------------- */}
      {/* Drawer */}
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant='temporary'
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        />
        <Drawer
          variant='permanent'
          ModalProps={{
            keepMounted: false, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        />
      </Box>
    </Box>
  );
};

export default AppBar;
