import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

import PropTypes from "prop-types";
import { classNames } from "../../utils/classNames";
import { useGetInsuranceCompanies } from "../../hooks/user/useGetInsuranceCompanies";

export const SelectInsuranceCompany = ({ value, handleSelectCompany }) => {
  const [company, setCompany] = useState(value || `Seleccione una compania`);
  const { companies } = useGetInsuranceCompanies();

  //
  return (
    <Listbox
      value={company}
      onChange={(selectedCompany) => {
        setCompany(selectedCompany);
        handleSelectCompany(selectedCompany);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Compañia de Seguros
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
              <span className="block truncate">{company}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {companies.map((company) => (
                  <Listbox.Option
                    key={company.id}
                    className={({ active }) =>
                      classNames(
                        active ? `bg-sky-600 text-white` : `text-gray-900`,
                        `relative cursor-default select-none py-2 pl-8 pr-4`
                      )
                    }
                    value={company.name}
                  >
                    {({ value, active }) => (
                      <>
                        <span
                          className={classNames(
                            value ? `font-semibold` : `font-normal`,
                            `block truncate`
                          )}
                        >
                          {company.name}
                        </span>

                        {value ? (
                          <span
                            className={classNames(
                              active ? `text-white` : `text-sky-600`,
                              `absolute inset-y-0 left-0 flex items-center pl-1.5`
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

SelectInsuranceCompany.propTypes = {
  handleSelectCompany: PropTypes.func,
  value: PropTypes.string,
};
