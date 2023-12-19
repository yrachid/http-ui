import styled from "styled-components";

const ResponseBodyContainer = styled.section`
  padding: 5px;
  max-height: 650px;
  overflow: scroll;
`;

export const ResponseBody = (props: { body: string }) => (
  <ResponseBodyContainer>
    <code role="response-body-content">{props.body}</code>
  </ResponseBodyContainer>
);
