import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(2, 0, 0),
    },
    text: {
      padding: theme.spacing(0, 2, 0, 0),
    },
  }),
);

interface ITagsList {
  tags: {
    id: number;
    name: string;
    code: string;
  }[];
}

export default function TagsList({ tags }: ITagsList) {
  const classes = useStyles();

  if (tags.length === 0) return <></>;

  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <Typography variant="body1" className={classes.title} color="primary">
        Tags
      </Typography>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        {tags.map((tag) => (
          <Typography key={tag.id} variant="body2" className={classes.text}>
            {tag.name}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
}
