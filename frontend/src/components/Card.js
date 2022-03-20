import '../App.css'
import { Button } from '@mui/material'
import Card from '@mui/material/Card';


const Cardx = ( {info} ) => {
    return (
        <div className='cardLoad'>
            <Card sx={{ marginTop: "20px", padding: "20px", color: "#eafecc", background: "#6495ed", width: "600px" }}>
                <div className='cardTitle'>
                    <h2>{info.title}</h2>
                </div>
                <br />
                <div className='cardParagraph'>
                    <p>{info.paragraph}</p>
                </div>
                {info.url ? <a className="urlLink" href={info.url} target="_blank"><Button sx={{ marginTop: "10px", marginLeft: "8px" }} size="small" variant="contained">Read Full Article</Button></a> : null}
            </Card>

        </div>
    )
}

export default Cardx

/*            <div className="card">
                <h3>{info.title}</h3>
                <br />
                <p>{info.paragraph}</p>
                <a className="urlLink" href={info.url} target="_blank"><Button sx={{ color: "#eafecc" }} color="error" variant="outlined">Read Full Article</Button></a>
            </div>
*/