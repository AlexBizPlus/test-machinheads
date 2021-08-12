import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TestImg from '../../assets/img/test-image.jpg';
import { IArticle } from '../../types';
import { Routes } from '../../const';
import { history } from '../../store';
import { deleteArticleFetcher } from '../../libs/api-article';
import useArticlesList from '../../data/use-articles-list';
import { ResponseStatus } from '../../const';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    text: {
      padding: theme.spacing(0, 2, 0, 0),
    },
  }),
);

interface IArticleProp {
  item: IArticle;
}

export default function ArticleItem({ item }: IArticleProp) {
  const classes = useStyles();

  const { mutate } = useArticlesList();
  const { title, previewPicture, code, authorName, tagNames, id } = item;

  const handleCardClick = () => {
    history.push(`${Routes.READ_ARTICLE}/${id}`);
  };

  const handleDeleteCardClick = async () => {
    const response = await deleteArticleFetcher(id.toString());
    if (response.responseStatus === ResponseStatus.OK) {
      mutate();
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia className={classes.media} image={previewPicture.url || TestImg} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {code}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Автор: {authorName}
          </Typography>
          {tagNames && tagNames.length > 0 && (
            <>
              {tagNames.map((tag) => (
                <Typography key={tag} variant="body2" className={classes.text} color="textSecondary" component="span">
                  {tag}
                </Typography>
              ))}
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleCardClick}>
          Читать
        </Button>
        <Button size="small" color="primary">
          Редактировать
        </Button>
        <Button size="small" color="primary" onClick={handleDeleteCardClick}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
