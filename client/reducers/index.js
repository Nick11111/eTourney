import { routerReducer as routing } from 'react-router-redux';
// need to be as routing because react-router-redux api
import { combineReducers } from 'redux';
import Modal from './modal-reducer';
import Auth from './auth-reducer';
import mainPageGames from './reducer_mainpage_fav_tournament_list';
import bigtournament from './reducer_mainpage_fav_tournament_big';

const rootReducer = combineReducers({
  routing,
  Modal,
  Auth,
  mainPageGames,
  bigtournament,
});

export default rootReducer;
