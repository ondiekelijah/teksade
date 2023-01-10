import React, { Fragment, useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { IconButton } from './Button';

const SunIcon: React.FC<{ selected?: boolean; className?: string }> = ({
  selected,
  ...props
}) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path
        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
        className={
          selected
            ? 'fill-sky-400/20 stroke-sky-500'
            : 'stroke-gray-400 dark:stroke-gray-500'
        }
      />
      <path
        d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836'
        className={
          selected ? 'stroke-sky-500' : 'stroke-gray-400 dark:stroke-gray-500'
        }
      />
    </svg>
  );
};

const MoonIcon: React.FC<{ selected?: boolean; className?: string }> = ({
  selected,
  ...props
}) => {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z'
        className={selected ? 'fill-sky-400/20' : 'fill-transparent'}
      />
      <path
        d='m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z'
        className={
          selected ? 'fill-sky-500' : 'fill-gray-400 dark:fill-gray-500'
        }
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z'
        className={
          selected ? 'fill-sky-500' : 'fill-gray-400 dark:fill-gray-500'
        }
      />
    </svg>
  );
};

const PcIcon: React.FC<{ selected?: boolean; className?: string }> = ({
  selected,
  ...props
}) => {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z'
        strokeWidth='2'
        strokeLinejoin='round'
        className={
          selected
            ? 'fill-sky-400/20 stroke-sky-500'
            : 'stroke-gray-400 dark:stroke-gray-500'
        }
      />
      <path
        d='M14 15c0 3 2 5 2 5H8s2-2 2-5'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={
          selected ? 'stroke-sky-500' : 'stroke-gray-400 dark:stroke-gray-500'
        }
      />
    </svg>
  );
};

let settings = [
  {
    value: 'light',
    label: 'Light',
    icon: SunIcon,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: MoonIcon,
  },
  {
    value: 'system',
    label: 'System',
    icon: PcIcon,
  },
];

export function ThemeToggle({ panelClassName = 'mt-4' }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  // When mounted on client, now we have resolved the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Listbox value={theme} onChange={setTheme}>
      <Listbox.Label className='sr-only'>Theme</Listbox.Label>
      <Listbox.Button type='button'>
        <span className='dark:hidden'>
          <IconButton as='span' variant='ghost' aria-label='light theme'>
            <SunIcon
              className='h-6 w-6'
              selected={resolvedTheme !== 'system'}
            />
          </IconButton>
        </span>
        <span className='hidden dark:inline'>
          <IconButton as='span' variant='ghost' aria-label='dark theme'>
            <MoonIcon
              className='h-6 w-6'
              selected={resolvedTheme !== 'system'}
            />
          </IconButton>
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={clsx(
          'dark:highlight-white/5 absolute top-full right-0 z-50 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-gray-700 shadow-lg ring-1 ring-gray-900/10 dark:bg-gray-800 dark:text-gray-300 dark:ring-0',
          panelClassName
        )}
      >
        {settings.map(({ value, label, icon: Icon }) => (
          <Listbox.Option key={value} value={value} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={clsx(
                  'flex cursor-pointer items-center py-1 px-2',
                  selected && 'text-sky-500',
                  active && 'bg-gray-50 dark:bg-gray-600/30'
                )}
              >
                <Icon selected={selected} className='mr-2 h-6 w-6' />
                {label}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export function ThemeSelect() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  // When mounted on client, now we have resolved the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  let option = settings.find((x) => x.value === resolvedTheme);

  return (
    <div className='flex items-center justify-between'>
      <label
        htmlFor='theme'
        className='font-normal text-gray-700 dark:text-gray-400'
      >
        Switch theme
      </label>
      <div className='dark:highlight-white/5 relative flex items-center rounded-lg p-2 font-semibold text-gray-700 shadow-sm ring-1 ring-gray-900/10 dark:bg-gray-600 dark:text-gray-200 dark:ring-0'>
        <SunIcon className='mr-2 h-6 w-6 dark:hidden' />
        <MoonIcon className='mr-2 hidden h-6 w-6 dark:block' />

        {option!.label}
        <svg className='ml-2 h-6 w-6 text-gray-400' fill='none'>
          <path
            d='m15 11-3 3-3-3'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <select
          id='theme'
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className='absolute inset-0 h-full w-full appearance-none opacity-0'
        >
          {settings.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
