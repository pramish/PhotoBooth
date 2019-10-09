import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../common/Navbar";
import {
  Card,
  Image,
  Loader,
  Icon,
  Dimmer,
  Segment,
  Comment,
  Button,
  Grid,
  Header,
  Form
} from "semantic-ui-react";
import axios from "axios";

const Feed = props => {
  const [fetching, setFetching] = useState(true);
  const [feed, setFeed] = useState({});

  console.log(props.match.params.id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/feeds/${props.match.params.id}`)
      .then(res => {
        setFeed(res.data);
        setFetching(false);
      });
  }, []);
  return (
    <FeedContainer>
      <Navbar history={props.history} />
      <div
        style={{ marginBottom: "1rem" }}
        onClick={() => props.history.push("/home")}
      >
        <Button>
          <i className="icon arrow alternate circle left outline"></i>
          Go Back
        </Button>
      </div>
      {fetching ? <Loader size="large">Loading</Loader> : getFeed(feed)}
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  .left-img {
    position: fixed;
    margin-top: 1.2rem;
  }
`;

const getFeed = feed => (
  <div>
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <div className="left-img">
            <Image src={feed.image} wrapped ui={false} />
          </div>
        </Grid.Column>
        <Grid.Column>
          {getComments()}
          {getComments()}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const getComments = () => (
  <Comment.Group>
    <Header as="h3" dividing>
      Comments
    </Header>

    <Comment>
      {/* <Comment.Avatar src="/images/avatar/small/matt.jpg" /> */}
      <Comment.Content>
        <Comment.Author as="a">Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      {/* <Comment.Avatar src="/images/avatar/small/elliot.jpg" /> */}
      <Comment.Content>
        <Comment.Author as="a">Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          {/* <Comment.Avatar src="/images/avatar/small/jenny.jpg" /> */}
          <Comment.Content>
            <Comment.Author as="a">Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      {/* <Comment.Avatar src="/images/avatar/small/joe.jpg" /> */}
      <Comment.Content>
        <Comment.Author as="a">Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </Comment.Group>
);

export default Feed;
