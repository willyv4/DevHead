import { SignedIn, SignedOut } from "@clerk/remix";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import { NavLink } from "@remix-run/react";
import screenshot from "../../public/screen_shot.png";
import GitHubIcon from "./utility/icon-components/GitHubIcon";
import LeetCodeIcon from "./utility/icon-components/LeetCodeIcon";
import Typewriter from "typewriter-effect";

const features = [
  {
    name: "Share Projects/Contributions",
    description:
      "Join the DevHead community and proudly share your coding achievements. Post your projects, share code links, and showcase live websites. Be inspired as you explore and contribute to others' projects!",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Connect LeetCode",
    description:
      "Why say you have coding skills when you can show it? Link your LeetCode profile and showcase your problem-solving abilities with an overview of your LeetCode stats.",
    icon: LeetCodeIcon,
  },
  {
    name: "Connect GitHub",
    description:
      "Link your GitHub account and showcase your programming expertise with an overview of your GitHub statistics and contributions.",
    icon: GitHubIcon,
  },
];
const Home = () => {
  return (
    <div className="bg-gray-900">
      <div className="relative isolate pt-14">
        {/* PURPLE BLOB */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              {/* HEADER */}
              <div className="justify-center text-center text-4xl font-bold tracking-tight text-white sm:text-6xl flex flex-row">
                DevHead:{" "}
                <div className="ml-2">
                  <Typewriter
                    options={{
                      strings: ["Connect.", "Code.", "Create."],
                      autoStart: true,
                      loop: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter.pauseFor(1000).deleteAll().start();
                    }}
                  />
                </div>
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                DevHead is your gateway to a thriving developer community!
                Connect with fellow developers, integrate your LeetCode and
                GitHub profiles, and share portfolio pieces. Whether you're
                seeking inspiration, learning opportunities, or simply a place
                to share your coding journey, DevHead has you covered.
              </p>

              {/* SIGNED IN LINKS */}
              <SignedIn>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <div className="mt-10 flex items-center gap-x-6">
                    <NavLink
                      to="/posts"
                      className="rounded-md ring-1 ring-purple-400 bg-purple-400/30 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300/20"
                    >
                      {(p) => (p.isPending ? "loading..." : "Explore Projects")}
                    </NavLink>
                    <NavLink
                      to="/users"
                      className="text-sm font-semibold text-white"
                    >
                      {(p: any) =>
                        p.isPending ? (
                          "loading..."
                        ) : (
                          <>
                            Connect with Devs <span aria-hidden="true">→</span>{" "}
                          </>
                        )
                      }
                    </NavLink>
                  </div>
                </div>
              </SignedIn>

              {/* SIGNED OUT LINKS */}
              <SignedOut>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <div className="mt-10 flex items-center gap-x-6">
                    <NavLink
                      to="/about"
                      prefetch="render"
                      className="rounded-md ring-1 ring-purple-400 bg-purple-400/30 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300/20"
                    >
                      {(p) => (p.isPending ? "loading..." : "About DevHead")}
                    </NavLink>
                    <NavLink
                      to="/sign-up"
                      prefetch="render"
                      className="text-sm font-semibold text-white"
                    >
                      {(p) =>
                        p.isPending ? (
                          "loading..."
                        ) : (
                          <>
                            Sign Up <span aria-hidden="true">→</span>{" "}
                          </>
                        )
                      }
                    </NavLink>
                  </div>
                </div>
              </SignedOut>
            </div>
            <img
              src={screenshot}
              alt="App screenshot"
              width={2432}
              height={1442}
              className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
            />
          </div>
        </div>
        {/* PURPLE BLOB */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="-mt-6 sm:-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
              Streamline Your Portfolio Site.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unlock your potential with DevHead. Showcase your skills
              effortlessly and make your mark in the world of tech.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex flex-row align-base text-base font-bold leading-7 text-gray-100">
                    <div className="inline-flex items-center rounded-md bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                      <feature.icon height="1rem" width="1rem" />
                    </div>
                    <p className="ml-5 mt-[.5px]">{feature.name}</p>
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
