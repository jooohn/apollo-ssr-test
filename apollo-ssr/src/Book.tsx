import React from 'react';
import { Query } from 'react-apollo';

import SHOW_BOOK_QUERY from './graphql/ShowBook';

export default (data) => {
  const { match: { params: { bookId } } } = data;
  return <Query query={SHOW_BOOK_QUERY} variables={{ bookId }}>
    {({ data, loading }) => {
      if (loading) {
        return 'Now Loading';
      }
      const { book } = data;
      return <div>
        <h1>{book.title} by {book.author}</h1>
        <div>
          {book.content}
        </div>
      </div>
    }}
  </Query>
};
// export default ({ match: { params: { bookId } } }) => (
//   <Query query={SHOW_BOOK_QUERY} variables={{ bookId }}>
//     {({ data: { book } }) => (
//       <div>
//         <h1>{book.title} by {book.author}</h1>
//         <div>
//           {book.content}
//         </div>
//       </div>
//     )}
//   </Query>
// );
