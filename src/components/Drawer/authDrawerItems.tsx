import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Link from '@components/Link';
import { IpageLinks, pageLinks } from '@components/Drawer/pageLinks';
import { useDeleteAuthSessionMutation } from '@redux/AuthSession';

/**
 * Render Drawer list items IF the user is authenticated
 */
const AuthDrawerListItems: React.FC = () => {
  const { home, logout } = pageLinks;
  const [deleteAuthSession] = useDeleteAuthSessionMutation();

  const drawerLinks: IpageLinks[] = [home];

  const handleLogoutOnclick = () => {
    // no need to redirect to login page after logging out.
    // the router in @components/AppBar/index.tsx in the useEffect function will redirect to the login page.
    // this is possible because when using the `deleteAuthSession` redux hook,
    //    it invalidates the tag that stores the IP address,
    //    causing it to fetch a new ip address using the `useGetAuthSessionQuery` redux hook.
    //    once the new data is fetched, it find ip address is empty, causing it to redirect to the login page.
    deleteAuthSession().catch(console.error);
  };

  return (
    <>
      {drawerLinks.map(({ linkName, url, icon }) => (
        // using Material-UI ListItem as button to navigate NextJS pages
        // https://dev.to/ivandotv/using-next-js-link-component-with-material-ui-buttons-and-menu-items-3m6a
        <ListItem button component={Link} href={url} key={linkName} rel='noreferrer'>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={linkName} />
        </ListItem>
      ))}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <ListItem button onClick={handleLogoutOnclick}>
        <ListItemIcon>{logout.icon}</ListItemIcon>
        <ListItemText primary={logout.linkName} />
      </ListItem>
    </>
  );
};

export default AuthDrawerListItems;
