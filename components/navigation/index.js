
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

export default function Navigation({ source }) {
  const { datasets } = source?.scope;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className=" sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      href="/"
                      className={
                        "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      }
                      //aria-current={item.current ? 'page' : undefined}
                    >
                      Home
                    </Link>
                    {datasets.map((item) => (
                      <Link
                        key={item._id}
                        href={item.url_path}
                        className={"text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
                        //aria-current={item.current ? 'page' : undefined}
                      >
                        {item.metadata.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
