import { NavLink, useMatches, useResolvedPath } from '@remix-run/react';
import { To } from '@remix-run/router';

type IconElement = React.SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
};

export type TabProps = {
  Icon: React.FC<IconElement>;
  text: string;
  to: To;
};

export function Tab({ Icon, text, to }: TabProps) {
  const resolved = useResolvedPath(to);
  const matches = useMatches();
  const isActive = matches.find((m) => m.pathname === resolved.pathname);

  return (
    <li className={isActive ? `cursor-default` : `cursor-pointer`}>
      <NavLink
        to={to}
        className={`group w-full gap-x-2 max-w-[12rem] inline-flex items-center justify-around p-4 rounded-t-lg border-b-2 ${
          isActive
            ? 'text-primary-500 border-primary-500'
            : 'border-transparent hover:text-[hsl(var(--foreground))]  hover:border-foreground'
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            isActive
              ? 'text-primary-500'
              : 'text-[hsl(var(--lead-text))]  group-hover:text-[hsl(var(--foreground))] '
          }`}
        />
        <p className="flex-1">{text}</p>
      </NavLink>
    </li>
  );
}
