import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import INDEX_QUERY from './graphql/Index';

export default () => (
  <Query query={INDEX_QUERY}>
    {({ loading, data }) => {
      if (loading) {
        return 'Now Loading';
      }
      const { books } = data;
      return <div>
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                {book.title} by {book.author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    }}
  </Query>
);
