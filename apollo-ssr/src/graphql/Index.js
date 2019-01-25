import gql from 'graphql-tag'

export default gql`
query Index {
  books {
    id
    title
    author
  }
}
`;
