import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useAuthorsList from '../../data/use-authors-list';
import { IAuthor } from '../../types';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { ICheckedInitialState } from '../../store/checked/reducer';
import { setCheckedAuthor } from '../../store/checked/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid black',
      borderRadius: 5,
    },
  }),
);

export default function AuthorTemplate() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const checkedAuthor = useSelector((state: { CHECKED: ICheckedInitialState }) => state.CHECKED.author);

  const { authors, loading, error } = useAuthorsList();

  const handleToggle = (value: number) => () => {
    dispatch(setCheckedAuthor({ author: value }));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка ... попробуйте перезагрузить ...</div>;
  if (authors.length === 0) return <div>Нет данных...</div>;

  return (
    <Grid className={classes.root} container direction="column" justifyContent="center" alignItems="center">
      <Typography variant="body2" color="textSecondary" component="h6">
        Авторы
      </Typography>
      <List dense>
        {authors.map((author: IAuthor) => {
          const { id, name, lastName, secondName, avatar } = author;
          const labelId = `radio-author-${id}`;
          return (
            <ListItem key={id} button role={undefined} onClick={handleToggle(id)}>
              <ListItemIcon>
                <Radio edge="end" checked={id === checkedAuthor} inputProps={{ 'aria-labelledby': labelId }} />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar alt={avatar.name} src={avatar.url} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${name} ${lastName} ${secondName}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
