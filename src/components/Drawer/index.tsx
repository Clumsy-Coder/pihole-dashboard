import Divider from '@mui/material/Divider';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import AuthDrawerListItem from '@components/Drawer/authDrawerItems';
import { IpageLinks, pageLinks } from '@components/Drawer/pageLinks';
import Link from '@components/Link';
import { useGetAuthSessionQuery } from '@redux/AuthSession';

/**
 * Width of Drawer in pixels.
 *
 * Also to be used by _app.tsx to offset the main content when a permanent drawer is displayed
 */
export const drawerWidth = 200;

/**
 * Render basic Drawer List Items that don't require user Authentication
 */
const BasicDrawerListItems: React.FC = () => {
  const { about, githubRepo } = pageLinks;
  const drawerLinks: IpageLinks[] = [about, githubRepo];

  return (
    <>
      {/* eslint-disable-next-line object-curly-newline */}
      {drawerLinks.map(({ linkName, url, icon }) => (
        // using Material-UI ListItem as button to navigate NextJS pages
        // https://dev.to/ivandotv/using-next-js-link-component-with-material-ui-buttons-and-menu-items-3m6a
        <ListItem button component={Link} href={url} key={linkName} rel='noreferrer'>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={linkName} />
        </ListItem>
      ))}
    </>
  );
};

/**
 * Drawer items to render when opening the Drawer
 *
 * @returns Drawer items to be rendered
 */
export const DrawerList = () => {
  const { login } = pageLinks;
  const { data = { ipAddress: '', port: '' } } = useGetAuthSessionQuery();

  /**
   * Login button used as a Drawer List Item
   */
  const loginListItem = () => (
    <ListItem button component={Link} href={login.url} key={login.linkName} rel='noreferrer'>
      <ListItemIcon>{login.icon}</ListItemIcon>
      <ListItemText primary={login.linkName} />
    </ListItem>
  );

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        <>
          {data.ipAddress.length ? <AuthDrawerListItem /> : loginListItem()}
          <Divider />
          <BasicDrawerListItems />
        </>
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
 * @param props - component props. Check `CustomProps`
 * @returns JSX component
 *
 * @see {@link CustomProps}
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
