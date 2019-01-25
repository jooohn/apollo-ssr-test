const { ApolloServer, gql } = require('apollo-server');

const booksSize = 5000;
const books = Array.apply(null, Array(booksSize)).map((_, i) => ({
  id: `${i}`,
  title: `book ${i}`,
  author: `author-${i}`,
  content: `${i}: Ceratosaurus was a theropod dinosaur in the Late Jurassic, around 150 million years ago. This genus was first described in 1884 by American paleontologist Othniel Charles Marsh based on a nearly complete skeleton discovered in Garden Park, Colorado, in rocks belonging to the Morrison Formation. In 2000 and 2006, a partial specimen from the Lourinhã Formation of Portugal was described, providing evidence for the presence of the genus outside of North America. Ceratosaurus was a predator with deep jaws supporting long, blade-like teeth. It had a prominent, ridge-like horn on the midline of the snout and a pair of horns over the eyes. The forelimbs were very short but remained fully functional, with four-fingered hands. The tail was thick from top to bottom. It shared its habitat with other large theropods including Torvosaurus and Allosaurus. It may have hunted plant-eating dinosaurs or aquatic prey such as fish. The nasal horn was probably used solely for display. (Full article...)`,
}));

const typeDefs = gql`
type Book {
  id: String!
  title: String!
  author: String!
  content: String!
}

type Query {
  books: [Book!]!
  book(id: ID!): Book
}
`;

const resolvers = {
  Query: {
    books: () => {
      console.log('/books');
      return books;
    },
    book: (obj, { id }, context, info) => {
      console.log(`/books/${id}`);
      return books.find((book) => book.id === id);
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
