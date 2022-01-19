import {useLocation} from "react-router-dom";
import { useState, useEffect } from 'react'
import Card from "../components/Card";

const ApiResultsPage = () => {
    const [info, setInfo] = useState([]);
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('search');
    console.log('hi');
    console.log(name);
    var data;
    var parsed;

    const queryString = 'http://127.0.0.1:8000/api/pygooglenewsresponse/?search=' + name;

    function jsonToString(item) {
        return JSON.stringify(item);
    }
    useEffect(() => {
        getData();
    
        async function getData() {
            const response = await fetch(queryString);
            console.log(response);

            data = await response.json();
            console.log(data);
            
            let count = 0;
            const parsedData = []
    
            for (let i = 0; i < 10; i++) {
                const object = {};
                object['title'] = jsonToString(data['entries'][i]['title']);
                object['index'] = i;
                parsedData.push(object);
            }
            
            //parsed = JSON.stringify(data['entries'][0]['title']);
            // need to wait for this info
            setInfo(parsedData);
        }
    }, []);
    
    return (
        <div className="apiResultsPage">
            {console.log(info)}
            {info.map(story => <Card key={story.index} info={story.title} />)}
        </div>
        )
}

export default ApiResultsPage;

//<Card info={info} />