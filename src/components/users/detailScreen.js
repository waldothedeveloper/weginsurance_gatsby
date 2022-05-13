import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { UserNotes } from "./notes";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

//

const Shell = ({ children }) => (
  <Transition
    show={true}
    enter="transition-opacity duration-500 ease-in"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-500 ease-out"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </Transition>
);

export const UserScreenDetails = ({ tab, currentSelectedUser }) => {
  const [name, setName] = useState(`Personal`);
  const {
    birthday,
    city,
    email,
    first_name,
    insurance_company,
    insurance_date,
    insurance_policy_number,
    lastname,
    notes,
    phone,
    plan,
    second_lastname,
    secondary_name,
    state,
    street_address,
    zipcode,
  } = currentSelectedUser;

  const poliza = {
    fields: {
      "Fecha de inscripcion": insurance_date,
      "Numero de poliza": insurance_policy_number,
      "Compañia de Seguros": insurance_company,
      "Tipo de Plan": plan,
    },
  };

  const profile = {
    fields: {
      "Primer Nombre": first_name,
      "Segundo Nombre": secondary_name,
      "Primer Apellido": lastname,
      "Segundo Apellido": second_lastname,
      Email: email,
      "Fecha de Nacimiento": birthday,
      Telefono: formatPhoneNumber(phone),
      // eslint-disable-next-line camelcase
      Direccion: `${street_address}, ${city}, ${state}, ${zipcode}`,
    },
  };

  useEffect(() => {
    const name = tab.filter((elem) => elem.current)[0].name;
    setName(name);
  }, [tab]);

  //
  switch (name) {
    case `Personal`:
      return (
        <Shell>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {Object.keys(profile.fields).map((field) => (
              <div key={field} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">{field}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {profile.fields[field]}
                </dd>
              </div>
            ))}
          </dl>
        </Shell>
      );
    case `Poliza`:
      return (
        <Shell>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {Object.keys(poliza.fields).map((field) => (
              <div key={field} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">{field}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {poliza.fields[field]}
                </dd>
              </div>
            ))}
          </dl>
        </Shell>
      );
    case `Notas`:
      return (
        <Shell>
          <UserNotes notes={notes} />
        </Shell>
      );
    default:
      return <Shell>Personal tab</Shell>;
  }
};

UserScreenDetails.propTypes = {
  tab: PropTypes.array.isRequired,
  currentSelectedUser: PropTypes.object.isRequired,
};

Shell.propTypes = {
  children: PropTypes.node.isRequired,
};
