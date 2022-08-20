import Divider from '@mui/material/Divider';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { IpageLinks, pageLinks } from '@components/Drawer/pageLinks';
import Link from '@components/Link';

/**
 * Width of Drawer in pixels.
 *
 * Also to be used by _app.tsx to offset the main content when a permanent drawer is displayed
 */
export const drawerWidth = 200;

/**
 * Drawer items to render when opening the Drawer
 *
 * @returns Drawer items to be rendered
 */
export const DrawerList = () => {
  const { home, about, login, githubRepo } = pageLinks;
  const drawerLinks: IpageLinks[] = [home, about, login, githubRepo];
  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {/* eslint-disable-next-line object-curly-newline */}
        {drawerLinks.map(({ linkName, url, icon }) => (
          // using Material-UI ListItem as button to navigate NextJS pages
          // https://dev.to/ivandotv/using-next-js-link-component-with-material-ui-buttons-and-menu-items-3m6a
          <ListItem
            button
            component={Link}
            href={url}
            key={linkName}
            rel='noreferrer'
            // onClick={onClick}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={linkName} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

interface CustomProps extends DrawerProps {
  open?: boolean;
  onClose?: () => void;
  // children: React.ReactNode;
}

/**
 * Render Drawer component.
 * Drawer items are rendered separately.
 * Will show content differently when logged in
 *
 * @param props.open is drawer open
 * @param props.onClose function to call when closing the Drawer
 * @returns JSX component
 */
const Drawer = (props: CustomProps) => {
  const { open: isDrawerOpen, onClose: handleDrawerToggle, ...otherProps } = props;

  return (
    <MuiDrawer
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      PaperProps={{ onClick: handleDrawerToggle }}
      {...otherProps}
    >
      <DrawerList />
    </MuiDrawer>
  );
};

Drawer.defaultProps = {
  open: false,
  onClose: () => {},
};

export default Drawer;
