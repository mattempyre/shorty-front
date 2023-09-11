import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';

// Define a functional component named StickyNavbar
export function StickyNavbar() {
  // Declare a state variable openNav using React.useState to manage the mobile navigation state
  const [openNav, setOpenNav] = React.useState(false);

  // Use React.useEffect to add a resize event listener that closes the mobile navigation when the window width is greater than or equal to 960 pixels
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Render the Navbar component
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900 ">
        {/* Render a Typography component as a link to the homepage */}
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          {/* Render the brand name with a bold blue color */}
          <span className="font-bold text-blue-500 text-xl">Shorty </span>
          Url Shortener
        </Typography>
        <div className="flex items-center gap-4">
          {/* Render a button as a link to "#links" for "My Links" */}
          <a href="#links">
            <Button
              color="blue"
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>My Links</span>
            </Button>
          </a>
          {/* Render an IconButton for mobile navigation */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {/* Toggle between the menu icon and close icon based on the openNav state */}
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      {/* Render the MobileNav component with the openNav state */}
      <MobileNav open={openNav}>
        {/* Render a button as a link to "#links" for "My Links" within MobileNav */}
        <a href="#links">
          <Button
            color="blue"
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
          >
            <span>My Links</span>
          </Button>
        </a>
      </MobileNav>
    </Navbar>
  );
}
