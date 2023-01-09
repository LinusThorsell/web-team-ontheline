import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getNews } from "../firebase";

const NewsContainer = styled.div`
  margin: 0;
  padding: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  width: 100%;
  height: auto;

  display: flex;
  background-color: #301934;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const NewsContentContainer = styled.div`
  padding: 0;

  width: 95%;
  height: auto;

  @media (min-width: 50em) {
    width: 50em;
  }
  @media (min-width: 70em) {
    width: 70em;
  }
`;

export function NewsContent(props) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  let content = props.content;
  let buttontext = "Visa mindre...";

  if (!expanded) {
    content = content.slice(0, 80) + "...";
    buttontext = "Visa mer...";
  }

  return (
    <NewsContentContainer>
      <Card sx={{ width: "100%", marginBottom: "0.5em" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.date}
          </Typography>
          <Typography variant="body2">{content}</Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary" size="small" onClick={toggleExpanded}>
            {buttontext}
          </Button>
        </CardActions>
      </Card>
    </NewsContentContainer>
  );
}

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews().then((data) => {
      setNews(data);
    });
  }, []);

  const [amountNewsPosts, setAmountNewsPosts] = useState(1);

  // Assign id's to newsposts
  if (news[0] !== undefined && news[0].id === null) {
    let temp_news = news;
    temp_news.forEach((newsarticle, index) => {
      newsarticle.id = index;
    });
    setNews(temp_news);
  }

  function increaseLoadedNewsPosts() {
    setAmountNewsPosts(amountNewsPosts * 2);
  }

  return (
    <NewsContainer>
      {news.map((newsitem) => {
        return newsitem.id < amountNewsPosts ? (
          <NewsContent
            title={newsitem.title}
            date={newsitem.date}
            content={newsitem.content}
            key={newsitem.id}
          />
        ) : (
          <div key={newsitem.id}></div>
        );
      })}
      <Button
        variant="contained"
        color="secondary"
        onClick={increaseLoadedNewsPosts}
      >
        Ladda in fler nyheter
      </Button>
    </NewsContainer>
  );
}

export default News;
