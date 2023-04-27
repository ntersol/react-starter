import { useParams } from 'react-router-dom';

export function ViewUsers() {
  const temp = useParams();
  console.log(temp);
  return <div>Test</div>;
}
