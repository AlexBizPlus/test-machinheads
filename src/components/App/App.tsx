import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';
import { Routes } from '../../const';
import { history } from '../../store';
import ArticleList from '../ArticleList/ArticleList';
import Article from '../Article/Article';
import ArticleTemplate from '../ArticleTemplate/ArticleTemplate';
import Header from '../Header/Header';
import Login from '../Login/Login';
import useUser from '../../data/use-user';
import { IToastifyInitialState } from '../../store/toastify/reducer';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  const { user, loading, loggedOut } = useUser();
  const messages = useSelector((state: { TOASTIFY: IToastifyInitialState }) => state.TOASTIFY.messages);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    toast(messages[messages.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <ConnectedRouter history={history}>
      <ToastContainer />
      <Header />
      {user && !loggedOut ? (
        <Switch>
          <Route exact path={Routes.HOME} component={ArticleList} />
          <Route exact path={`${Routes.READ_ARTICLE}/:id`} component={Article} />
          <Route exact path={Routes.ADD_ARTICLE} component={ArticleTemplate} />
          <Redirect to={Routes.HOME} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path={Routes.LOGIN} component={Login} />
          <Redirect to={Routes.LOGIN} />
        </Switch>
      )}
    </ConnectedRouter>
  );
};

export default App;
