import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import Link from '@components/Link';
import { IpageLinks, pageLinks } from '@components/Drawer/pageLinks';
import { useDeleteAuthSessionMutation } from '@redux/AuthSession';
import { useAppDispatch } from '@redux/store';
import api, { TagTypes } from '@redux/apiSlice';

/**
 * Render Drawer list items IF the user is authenticated
 */
const AuthDrawerListItems: React.FC = () => {
  const { home, logout } = pageLinks;
  // const [deleteAuthSession] = useDeleteAuthSessionMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const drawerLinks: IpageLinks[] = [home];

  const handleLogoutOnclick = () => {
    // deleteAuthSession()
    //   .then(() => {
    //     router.push('/login').catch(console.error);
    //   })
    //   .catch(console.error);

    signOut({ redirect: false })
      .then(async () => {
        // this is needed to update the RTK query cache when logging out.
        // since logging out is now handled by NextAuth, RTK query needs to invalidate the cached tag `AUTH`.
        // This will cause RTK query hook for getting session to refetch from the api
        //
        // obtained from
        // https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#general-updates
        dispatch(api.util.invalidateTags([TagTypes.AUTH]));

        await router.push('/login');
      })
      .catch(console.error);
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
