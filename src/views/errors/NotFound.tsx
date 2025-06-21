import { Link } from 'react-router'

function NotFound() {
  return (
    <section className="error-page">
      <h1>PAGE NOT FOUND - 404</h1>
      <Link className='btn main-btn' to='/'>Back to Home page</Link>
    </section>
  )
}

export default NotFound