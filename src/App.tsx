import './App.css';
import Counter from './features/counter/Counter';
import Users from './features/users/Users';
import FilteredUsers from './features/filtered-users/FilteredUsers';
import { useEffect } from 'react';
import { useAppSelector } from './hooks';
import { ThemeSwitch } from './components/app-components/theme-switch';
import PreventRerender from './features/prevent-rerender/PreventRerender';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { theme } = useAppSelector((state) => state.theme);
  // const { log } = useAppSelector((state) => state.rerender);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="card">
      <h1>Redux App</h1>
      <div className="flex flex-row gap-4">
        <PreventRerender />
        <Counter />
        <Users />
        <FilteredUsers />
      </div>
      <Toaster position="top-center" />
      <ThemeSwitch />
    </div>
  );
}

export default App;
