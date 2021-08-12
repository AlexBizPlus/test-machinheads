import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { lowercase, numbers } from 'nanoid-dictionary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TagsTemplate from '../TagsTemplate/TagsTemplate';
import AuthorTemplate from '../AuthorTemplate/AuthorTemplate';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { Routes, ResponseStatus } from '../../const';
import { history } from '../../store';
import { addArticle } from '../../libs/api-article';
import useArticlesList from '../../data/use-articles-list';
import { ICheckedInitialState } from '../../store/checked/reducer';
import { setAddToastify } from '../../store/toastify/actions';
import { clearChecked } from '../../store/checked/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
        maxWidth: '30ch',
      },
    },
    container: {
      width: '100%',
      columnGap: 20,
      rowGap: 20,
      marginBottom: 20,
    },
    header: {
      padding: theme.spacing(2),
    },
    inputFile: {
      cursor: 'pointer',
    },
  }),
);

export default function ArticleTemplate() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [textValue, setTextValue] = React.useState<string>('');
  const [titleValue, setTitleValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const checkedAuthor = useSelector((state: { CHECKED: ICheckedInitialState }) => state.CHECKED.author);
  const checkedTags = useSelector((state: { CHECKED: ICheckedInitialState }) => state.CHECKED.tags);

  const { mutate } = useArticlesList();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target?.id) {
      case 'title':
        setTitleValue(event.target.value);
        break;

      case 'text':
        setTextValue(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();
    if (checkedAuthor && inputFileRef && inputFileRef?.current?.files && inputFileRef?.current?.files?.length > 0) {
      const code = customAlphabet(lowercase + numbers, 10);
      const articleData = new FormData();
      articleData.append('code', code());
      articleData.append('title', titleValue);
      articleData.append('authorId', checkedAuthor.toString());
      articleData.append('text', textValue);
      articleData.append('previewPicture', inputFileRef?.current?.files[0]);

      if (checkedTags && checkedTags.length > 0) {
        checkedTags.forEach((elem) => {
          articleData.append('tagIds[]', elem.toString());
        });
      }
      const response = await addArticle(articleData);
      setIsLoading(false);

      if (response.responseStatus === ResponseStatus.OK) {
        mutate();
        history.push(Routes.HOME);
      }
    }
    if (!checkedAuthor) {
      dispatch(setAddToastify('Укажите автора'));
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearChecked());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      id="addArticleForm"
      name="addArticleForm"
      className={classes.root}
      autoComplete="off"
      onSubmit={handleFormSubmit}>
      <Typography variant="h5" align="center" component="h1" className={classes.header}>
        Создание статьи
      </Typography>
      <Grid className={classes.container} container direction="column" justifyContent="center" alignItems="center">
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          value={titleValue}
          onChange={handleTextChange}
          variant="outlined"
        />
        <TextField
          required
          id="text"
          name="text"
          label="Text"
          multiline
          rows={4}
          value={textValue}
          onChange={handleTextChange}
          variant="outlined"
        />
        <InputLabel htmlFor="file" className={classes.inputFile}>
          Изображение
        </InputLabel>
        <input
          id="file"
          type="file"
          required
          name="file"
          accept="image/*"
          className={classes.inputFile}
          ref={inputFileRef as React.RefObject<HTMLInputElement>}
        />
        <TagsTemplate />
        <AuthorTemplate />
        <Button variant="contained" disabled={isLoading} type="submit" color="primary">
          Сохранить
        </Button>
      </Grid>
    </form>
  );
}
