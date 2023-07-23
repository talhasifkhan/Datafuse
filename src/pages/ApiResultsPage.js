import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cardx from "../components/Card";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const ApiResultsPage = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("search");
  var data;
  let [loading, setLoading] = useState(false);
  const resultAmount = useSelector((state) => state.resultAmount);
  const timeFrame = useSelector((state) => state.timeFrame);
  const loadingTextArray = [
    "Finding optimal results...",
    "Summarizing with GPT...",
    "Fusing your data...",
  ];
  const [index, setIndex] = useState(0);

  const handleClick = (e) => {
    navigate("/");
  };

  const override = css`
    display: flex;
    margin: 0 auto;
    border-color: blue;
    color: red;
  `;

  const queryString = "/api/get-results/?search=" + name;

  function jsonToString(item) {
    return JSON.stringify(item);
  }

  async function getData(requestBody) {
    const parsedData = [];
    try {
      const response = await fetch(queryString, {
        method: "POST",
        mode: "cors",
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonToString(requestBody),
      });

      data = await response.json();
      for (let i = 0; i < resultAmount; i++) {
        const object = {};
        object["title"] = jsonToString(data["cards"][i]["title"]).replace(
          /['"]+/g,
          ""
        );
        object["paragraph"] = jsonToString(
          data["cards"][i]["paragraph"]
        ).replace(/['"]+/g, "");
        object["url"] = jsonToString(data["cards"][i]["url"]).replace(
          /['"]+/g,
          ""
        );
        object["index"] = i;
        parsedData.push(object);
      }
    } catch (error) {
      console.error(error);
      const object = {};
      object["title"] = "No Results Found :(";
      object["paragraph"] = "An error occurred, please try again later.";
      object["index"] = 0;
      parsedData.push(object);
    }
    setInfo(parsedData);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getData({ "Result Amount": resultAmount, "Time Frame": timeFrame });
  }, []);

  useEffect(() => {
    const timer = () => {
      setIndex((prevIndex) => {
        if (prevIndex === loadingTextArray.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    };
    setInterval(timer, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="apiResultsPage">
      {loading ? (
        <div className="loader">
          <h1 className="resultsTitle">{loadingTextArray[index]}</h1>
          <HashLoader
            color={"#36D7B7"}
            loading={loading}
            css={override}
            size={250}
          />
        </div>
      ) : (
        <>
          <h1 className="resultsTitle">Results</h1>
          <Button
            onClick={handleClick}
            sx={{ textAlign: "end" }}
            variant="contained"
          >
            New Search
          </Button>
          {info.map((story) => (
            <Cardx key={story.index} info={story} />
          ))}
        </>
      )}
    </div>
  );
};

export default ApiResultsPage;
