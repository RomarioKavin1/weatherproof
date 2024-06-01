import Button from "@/components/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white ">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 h-screen justify-center items-center">
        <div className="mx-auto w-1/2 pb-24 pt-10 sm:pb-32 flex lg:gap-x-10 lg:px-8  justify-center items-center">
          <div className="px-6 lg:px-0 lg:pt-4 ">
            <div className="mx-auto max-w-3xl">
              <div className="max-w-2xl">
                <img className="h-11" src="/sun.svg" alt="Your Company" />
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Beyond the forecast: AI & web3 redefine weather insurance.
                </h1>
              </div>
            </div>
          </div>
          {/* <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            NotificationSetting.jsx
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">
                            App.jsx
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center items-center">
            <img
              src="/moon.svg"
              className=" flex justify-center items-center"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-1/2">
            <p className=" text-lg leading-8 text-gray-800">
              Sick of insurance that feels like a guessing game? Us too! That's
              why we ditched the old system and built something awesome with AI.
              We use super smart tech and super reliable weather data (no shady
              backroom deals here) to give you fair shakes on both your premiums
              and any claims you gotta make.
            </p>
            <Link href="/login">
              <Button text="Launch app" />
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
