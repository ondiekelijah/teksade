import { IconButton } from "@/components/Button";
import { Transition } from "@headlessui/react";


// Used to display info an announcements
const HeroInnerBanner: React.FC<{ show: boolean; onClose: () => void }> = ({
    show,
    onClose,
  }) => {
    return (
      <Transition
        show={show}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative rounded bg-gradient-to-r from-purple-500 to-indigo-800 py-3 px-8 text-center text-white shadow-lg md:rounded-full">
        <p className="pr-5">
            Welcome to <span className="font-bold">Teksade</span>. An easier and
            faster tech community discovery platform.
          </p>
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2">
            <IconButton
              aria-label="close banner"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </span>
        </div>
      </Transition>
    );
  };

export default HeroInnerBanner;