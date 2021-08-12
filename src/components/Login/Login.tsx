import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DefaultUser } from '../../const';
import useUser from '../../data/use-user';
import { loginFetcher } from '../../libs/api-user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '25px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },

    container: {
      width: '100%',
      columnGap: '30px',
      rowGap: '25px',
    },
  }),
);

export default function Login() {
  const classes = useStyles();

  const { loading, mutate } = useUser();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLoginFormSubmit = () => {
    mutate(() => loginFetcher({ email: email, password: password }));
  };

  useEffect(() => {
    setEmail(DefaultUser.email);
    setPassword(DefaultUser.password);
  }, []);

  return (
    <form className={classes.root} autoComplete="off">
      <Grid className={classes.container} container direction="row" justifyContent="center" alignItems="center">
        <TextField required label="Required" id="email" variant="outlined" value={email} onChange={handleChangeEmail} />
        <TextField
          required
          label="Required"
          id="password"
          value={password}
          onChange={handleChangePassword}
          type="password"
          variant="outlined"
        />
        <Button variant="contained" disabled={loading} color="primary" onClick={handleLoginFormSubmit}>
          Войти
        </Button>
      </Grid>
    </form>
  );
}
