import Router from './router/router'
import Cookies from 'js-cookie';

function App() {
  console.log('Cookies:', Cookies.get('accessToken'));
  return <Router />
}

export default App
