
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>

            <Tilt className='Tilt br2' style={{ height: 150, width: 125 }}>
                <div className='Tilt-inner pa3' style={{ height: 'fit-Content', width: 'fit-Content' }}>
                    <img  src={brain} alt='logo'></img></div>
            </Tilt>
        </div>

    )
}

export default Logo