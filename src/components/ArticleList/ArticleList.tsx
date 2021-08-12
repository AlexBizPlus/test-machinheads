import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArticleItem from '../ArticleItem/ArticleItem';
import { IArticle } from '../../types';
import { history } from '../../store';
import { Routes } from '../../const';
import useArticlesList from '../../data/use-articles-list';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: '100%',
      marginTop: '20px',
    },
    button: {
      marginTop: '20px',
    },
  }),
);

export default function ArticleList() {
  const classes = useStyles();

  const { articles, loading, error } = useArticlesList();

  const handleAddButtonClick = () => history.push(Routes.ADD_ARTICLE);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка ... попробуйте перезагрузить ...</div>;
  if (articles.length === 0) return <div>Нет данных...</div>;

  return (
    <Grid container className={classes.root} justifyContent="center" spacing={2}>
      <Grid container justifyContent="center" spacing={2}>
        {articles.map((item: IArticle) => (
          <Grid key={item.id} item>
            <ArticleItem item={item} />
          </Grid>
        ))}
      </Grid>
      <Button className={classes.button} variant="contained" color="primary" onClick={handleAddButtonClick}>
        Добавить статью
      </Button>
    </Grid>
  );
}
