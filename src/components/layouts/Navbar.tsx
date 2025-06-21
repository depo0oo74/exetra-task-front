import { Link , useNavigate } from 'react-router'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../hooks/useAuth'
import NavLogo from '../../../public/nav-logo.jpg'

function Navbar() {
    // ** Hooks
    const navigate = useNavigate()
    const { logout } = useAuth();

    // ** Function to handle logout
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className='nav'>
            <div className='container'>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
                    <div>
                        <Link to="/" className='btn logo'>
                            <img src={NavLogo} alt='logo' />
                        </Link>
                    </div>
                    <div>
                        <Button className='btn btn-danger' onClick={handleLogout}>Logout &nbsp; <FontAwesomeIcon icon={faRightFromBracket} /></Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar