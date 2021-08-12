import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useUser from '../../data/use-user';
import { logout } from '../../libs/auth';
import HomeIcon from '../HomeIcon/HomeIcon';
import { history } from '../../store';
import { Routes } from '../../const';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      paddingRight: '50px',
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const { user, mutate, loggedOut } = useUser();

  const handleLogoutClick = () => {
    logout();
    mutate();
  };

  const handleHomeClick = () => {
    history.push(Routes.HOME);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Articles
          </Typography>
          {user && !loggedOut && (
            <>
              <Typography variant="caption" className={classes.title}>
                UserName: {user?.name}
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
