import { SvgIconTypeMap } from '@mui/material/SvgIcon';

import GithubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import QueryIcon from '@mui/icons-material/QueryStats';

/**
 * Appbar link structure.
 * Used for displaying links on Appbar or Drawer
 */
export interface IpageLinks {
  linkName: string;
  url: string;
  icon: React.ReactElement<SvgIconTypeMap<'svg'>>;
}

/**
 * Objects of pageLinks used by AppBar and Drawer.
 */
export const pageLinks: Record<string, IpageLinks> = {
  home: {
    linkName: 'Dashboard',
    url: '/',
    icon: <HomeIcon />,
  },
  about: {
    linkName: 'About',
    url: '/about',
    icon: <InfoIcon />,
  },
  githubRepo: {
    linkName: 'Github repo',
    url: 'https://github.com/clumsy-coder/pihole-dashboard',
    icon: <GithubIcon />,
  },
  login: {
    linkName: 'Login',
    url: '/login',
    icon: <LoginIcon />,
  },
  queryLog: {
    linkName: 'Query Log',
    url: '/queries',
    icon: <QueryIcon />,
  },
  // longterm data
  //    graphics
  //    query log
  //    top list
  // whitelist
  // blacklist
  // group management
  //    groups
  //    clients
  //    domains
  //    adlists
  // disable
  //    indefinitely
  //    for 10 seconds
  //    for 30 seconds
  //    for 5 minutes
  //    custom time
  // tools
  //    pi-hole diagnosis
  //    update gravity
  //    search adlist
  //    audit log
  //    tail pihole.log
  //    Tail FTL.log
  //    Generate debug log
  //    Network
  // Settings
  // Local DNS
  //    DNS records
  //    CNAME records
  // Logout
  // Donate
  // Documentation
};
