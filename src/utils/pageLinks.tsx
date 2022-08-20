import { SvgIconTypeMap } from '@mui/material/SvgIcon';

import GithubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

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
    linkName: 'Home',
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
};
