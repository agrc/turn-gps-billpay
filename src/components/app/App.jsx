import { useFirestore } from '@ugrc/utah-design-system';
import Routing from '../routing/Routing';
import AppContextProvider from '../../contexts/AppContext/AppContextProvider';

export default function App() {
  const { firestore } = useFirestore();

  return firestore ? (
    <AppContextProvider>
      <div className="utah-design-system" style={{ backgroundColor: 'white' }}>
        <Routing />
      </div>
    </AppContextProvider>
  ) : (
    <p>Loading</p>
  );
}
