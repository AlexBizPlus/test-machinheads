import React from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import useTagsList from '../../data/use-tags-list';
import { ITag } from '../../types';
import { setCheckedTags } from '../../store/checked/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      border: '1px solid black',
      borderRadius: 5,
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function TagsTemplate() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { tags, loading, error } = useTagsList();

  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    dispatch(setCheckedTags({ tags: newChecked }));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка ... попробуйте перезагрузить ...</div>;
  if (tags.length === 0) return <div>Нет данных...</div>;

  return (
    <Grid className={classes.root} container direction="column" justifyContent="center" alignItems="center">
      <Typography variant="body2" color="textSecondary" component="h6">
        Тэги
      </Typography>
      <List className={classes.list}>
        {tags.map((tag: ITag) => {
          const { id, name } = tag;
          const labelId = `checkbox-tag-${id}`;

          return (
            <ListItem key={id} role={undefined} dense button onClick={handleToggle(id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={name} />
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
