import { useParams } from 'react-router-dom';

export function ViewUsers() {
  const { userId } = useParams();
  console.log(userId);
  return <div>Test</div>;
}
