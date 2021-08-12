import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TestImg from '../../assets/img/test-image.jpg';
import { IArticleDetails } from '../../types';
import TagsList from '../TagsList/TagsList';
import { Routes, ResponseStatus } from '../../const';
import { history } from '../../store';
import useArticlesList from '../../data/use-articles-list';
import useArticle from '../../data/use-article';
import { deleteArticleFetcher } from '../../libs/api-article';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '30px auto',
  },
  media: {
    height: 140,
  },
  avatar: {
    marginRight: '20px',
  },
  actionArea: {
    cursor: 'default',
  },
  text: {
    paddingBottom: '15px',
  },
});

export default function Article() {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const { mutate } = useArticlesList();

  const { article, loading, error } = useArticle(id);

  const handleDeleteClick = async () => {
    const response = await deleteArticleFetcher(id);
    if (response.responseStatus === ResponseStatus.OK) {
      mutate();
      history.push(Routes.HOME);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка ... попробуйте перезагрузить ...</div>;

  const { title, previewPicture, author, tags, text }: IArticleDetails = article;

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia className={classes.media} image={previewPicture.url || TestImg} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">
            {title}
          </Typography>
          <Typography className={classes.text} variant="body1" color="textSecondary" component="p">
            {text}
          </Typography>
          {author.fullName && (
            <>
              <Typography variant="body2" color="primary" component="p">
                Автор:
              </Typography>
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Avatar className={classes.avatar} alt={author.avatar?.name} src={author.avatar?.url} />
                <Typography variant="body2" color="textSecondary" component="p">
                  {author.fullName}
                </Typography>
              </Grid>
            </>
          )}
          {tags && <TagsList tags={tags} />}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Редактировать
        </Button>
        <Button size="small" color="primary" onClick={handleDeleteClick}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
