import '../App.css'
import { Button } from '@mui/material'
import Card from '@mui/material/Card';


const Cardx = ( {info} ) => {
    return (
        <div className='cardLoad'>

            <div className="card">
                <div className='cardTitle'>
                    <h3>{info.title}</h3>
                </div>
                <br />
                <div className='cardParagraph'>
                    <p>{info.paragraph}</p>
                </div>
                {info.url ? <a className="urlLink" href={info.url} target="_blank"><Button sx={{ marginTop: "10px", marginLeft: "8px" }} size="small" variant="contained">Read Full Article</Button></a> : null}
            </div>

        </div>
    )
}

export default Cardx