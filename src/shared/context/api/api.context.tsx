import { ReactNode, createContext, useContext } from 'react';

export const ThemeContext = createContext('light');

const isFunction = (value: unknown): value is Function => typeof value === 'function';

/**
 *
 * @param contextModel
 * @returns
 */
export const createApiContext = <t,>(contextModel: t | (() => t)) => {
  const c = isFunction(contextModel) ? contextModel() : contextModel;
  const CoreContext = createContext(c);

  const contextToUse = useContext(CoreContext);

  // const bookState = {
  //   books,
  //   /**
  //    * Get all books.
  //    * Uses useCallback so that useEffect will not cause infinite loop
  //    */
  //   getAll: useCallback(async () => {
  //     const response = await axios.get('http://localhost:3001/books/');
  //     setBooks(response.data);
  //   }, []),
  //   /**
  //    *
  //    * @param {*} id
  //    * @returns
  //    */
  //   getOne: async id => {
  //     const response = await axios.get('http://localhost:3001/books/' + id);
  //     return response;
  //   },
  //   /**
  //    * Add/Update a book
  //    * @param {*} book
  //    */
  //   upsert: async book => {
  //     // If no ID, POST. If ID do PUT
  //     const response = isNotNil(book.id)
  //       ? await axios.put('http://localhost:3001/books/' + book.id, book)
  //       : await axios.post('http://localhost:3001/books', book);

  //     isNotNil(book.id)
  //       ? setBooks(books.map(b => (b.id === book.id ? { ...book, ...response.data } : b)))
  //       : setBooks([{ ...book, ...response.data }, ...books]);
  //   },
  //   removeOne: async id => {
  //     await axios.delete('http://localhost:3001/books/' + id);
  //     setBooks(books.filter(b => b.id !== id));
  //   },
  //   removeAll: () => {
  //     // eslint-disable-next-line no-restricted-globals
  //     const c = confirm('Are you sure you want to delete all books?');
  //     if (c) {
  //       Promise.all(books.map(b => axios.delete('http://localhost:3001/books/' + b.id))).then(() => {
  //         setBooks([]);
  //       });
  //     }
  //   },
  // };

  const provider = ({ children }: { children?: ReactNode | null }) => {
    return <CoreContext.Provider value={c}>{children}</CoreContext.Provider>;
  };

  return { context: contextToUse, provider };
};
