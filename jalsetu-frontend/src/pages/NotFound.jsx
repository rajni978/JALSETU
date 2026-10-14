import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-extrabold text-aqua-600">404</p>
      <p className="mt-2 text-navy-900">This page has dried up.</p>
      <Button as={Link} to="/" className="mt-6">Go to home</Button>
    </div>
  );
}