import gql from 'graphql-tag'

export default gql`
query ShowBook($bookId: ID!) {
  book(id: $bookId) {
    id
    title
    author
    content
  }
}
`;
