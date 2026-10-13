import ExamplePage from './kit/ExamplePage';

const users = [
  { key: 'john', name: 'John Doe', link: 'http://the-internet.herokuapp.com/add_remove_elements/' },
  { key: 'todd', name: 'Todd Stephens', link: 'http://the-internet.herokuapp.com/basic_auth' },
  { key: 'steven', name: 'Steven Sandhoff', link: 'http://the-internet.herokuapp.com/context_menu' },
];

const avatar = (name: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
       <rect width="80" height="80" rx="40" fill="#334155"/>
       <text x="40" y="50" font-family="sans-serif" font-size="28" fill="#e2e8f0" text-anchor="middle">${name.charAt(0)}</text>
     </svg>`,
  );

export default function HoversPage() {
  return (
    <ExamplePage id="hovers" title="Hovers">
      <p className="text-sm text-neutral-300">
        Hover over a card to reveal the hidden profile controls.
      </p>
      <div id="hover-container" className="flex flex-wrap gap-6">
        {users.map((user) => (
          <div
            key={user.key}
            id={`hover-card-${user.key}`}
            className="group w-40 rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-center"
          >
            <img
              id={`hover-avatar-${user.key}`}
              src={avatar(user.name)}
              alt={user.name}
              className="mx-auto h-20 w-20 rounded-full"
            />
            <div
              id={`hover-overlay-${user.key}`}
              className="invisible mt-2 space-y-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:visible group-hover:opacity-100"
            >
              <p id={`hover-name-${user.key}`} className="text-sm font-medium">{user.name}</p>
              <div className="flex justify-center gap-2">
                <a
                  id={`view-profile-${user.key}`}
                  href={user.link}
                  className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white transition-colors duration-200 ease-in-out hover:bg-emerald-500"
                >
                  View Profile
                </a>
                <a
                  id={`add-friend-${user.key}`}
                  href={user.link}
                  onClick={(event) => event.preventDefault()}
                  className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-800"
                >
                  Add Friend
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ExamplePage>
  );
}
