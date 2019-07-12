import React, { Component } from "react";
import { Container, Button } from "semantic-ui-react";
import { Accounts } from "meteor/accounts-base";
import PropTypes from "prop-types";

const PrivateHeader = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <Container className="logout-btn">
        <Button
          className="logout-btn"
          onClick={() => Accounts.logout()}
          secondary
        >
          Log Out
        </Button>
      </Container>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string
};

export default PrivateHeader;
