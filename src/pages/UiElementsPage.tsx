import { Navigate, Route, Routes } from 'react-router-dom';
import { examples } from './ui-elements/examples';
import UiElementsIndexPage from './ui-elements/UiElementsIndexPage';

export default function UiElementsPage() {
  return (
    <Routes>
      <Route index element={<UiElementsIndexPage />} />
      {examples.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/ui-elements" replace />} />
    </Routes>
  );
}
