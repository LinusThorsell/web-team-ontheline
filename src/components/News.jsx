import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

const NewsData = [
  {
    title: "OnTheLine Tour 2023!",
    date: "XX/01 - 2023",
    content:
      "Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
    id: null,
  },
  {
    title: "Ny Hemsida!",
    date: "05/01 - 2023",
    content:
      "Nu har vi än en gång uppdaterat våran hemsida! Detta kommer att göra så att sidan är både snabbare och lättare att navigera, bilder från 2022 års tour är även uppladdade under fliken 'Media'! Pass på och kolla den för att se hur kul vi hade förra året! Hoppas vi kan ha det lika roligt på årets tour! Mvh TD Linus Thorsell",
    id: null,
  },
];

function NewsContent(props) {
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

  // return (
  //   <NewsContentContainer>
  //     <NewsTitle>{props.title}</NewsTitle>
  //     <NewsDate>{props.date}</NewsDate>
  //     <NewsParagraph>{content}</NewsParagraph>
  //     <NewsButton type="button" onClick={toggleExpanded}>
  //       {buttontext}
  //     </NewsButton>
  //   </NewsContentContainer>
  // );

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
  // TODO: change to use props instead when done

  const [amountNewsPosts, setAmountNewsPosts] = useState(1);

  // Assign id's to newsposts
  NewsData.forEach((newsarticle, index) => {
    newsarticle.id = index;
  });

  function increaseLoadedNewsPosts() {
    setAmountNewsPosts(amountNewsPosts * 2);
  }

  return (
    <NewsContainer>
      {NewsData.map((news) => {
        return news.id < amountNewsPosts ? (
          <NewsContent
            title={news.title}
            date={news.date}
            content={news.content}
            key={news.title + news.date}
          />
        ) : (
          <></>
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
