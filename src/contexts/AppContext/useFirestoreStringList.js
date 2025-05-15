import { collection, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useFirestore } from '@ugrc/utah-design-system';
import { useImmer } from 'use-immer';

/**
 * @typedef StringListRecord {
 *  @property {string} id
 *  @property {number} index
 *  @property {string} stringList
 * }
 */
/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').Collections} Collections */

const STRING_LIST_SEPARATOR = '|';

/**
 * @param {Collections} collections
 * @returns {string[]}
 */
export default function useFirestoreStringList(collections) {
  // javascript string is 2 bytes per character (https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string#:~:text=The%20size%20of%20a%20JavaScript%20string%20is&text=Always%202%20bytes%20per%20character)
  // firestore maximum field value size is 1,048,487 bytes (https://firebase.google.com/docs/firestore/quotas)
  // 1,048,487 / 2 = 524,243.5
  const firestore = useFirestore();
  const recordCollection = collection(firestore, collections);
  const deployQuery = query(recordCollection, orderBy('index', 'asc'));
  const [data, setData] = useImmer([]);

  useEffect(() => {
    const unsubscribe = deployQuery.onSnapshot((snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(records);
    });

    return () => unsubscribe();
  }, [deployQuery, setData]);

  const [stringList, setStringList] = /** @type {typeof useImmer<string[]>} */ (
    useImmer
  )([]);

  const sortedStringList = useMemo(
    () =>
      [...(stringList || [])]
        .map((s) => [s, s.toLowerCase()])
        .sort(([, s1], [, s2]) => s1.localeCompare(s2))
        .map(([s]) => s),
    [stringList],
  );

  useEffect(() => {
    if (data?.length) {
      const strings = (data || [])
        .map((stringListRecord) => stringListRecord.stringList)
        .join('')
        .split(STRING_LIST_SEPARATOR);
      setStringList(strings);
    }
  }, [data, setStringList]);

  return sortedStringList;
}
