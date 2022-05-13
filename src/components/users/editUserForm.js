import { FormError } from "./userFormError";
import PropTypes from "prop-types";
import React from "react";
import { SelectInsuranceCompany } from "./selectInsuranceCompany";
import { classNames } from "../../utils/classNames";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { useRandomColor } from "../../hooks/user/useRandomColor";
const inputCss = `block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`;
//
export const EditUserForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  handleUser,
}) => {
  const { color, handleFocus } = useRandomColor();

  return (
    <div>
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8">
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informacion Personal
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Datos personales del cliente
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* First and second names */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.first_name) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className={
                      errors.first_name
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.first_name && (
                    <FormError>{errors.first_name}</FormError>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="second-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Segundo nombre
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.secondary_name) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="secondary_name"
                    id="secondary_name"
                    autoComplete="family-name"
                    className={
                      errors.secondary_name
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.secondary_name && (
                    <FormError>{errors.secondary_name}</FormError>
                  )}
                </div>
              </div>
              {/* Lastname */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Primer apellido
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.lastname) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="family-name"
                    className={
                      errors.lastname
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.lastname && <FormError>{errors.lastname}</FormError>}
                </div>
              </div>
              {/* Second lastname, people from many countries have two lastnames */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="second-lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Segundo apellido
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.second_lastname) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="second_lastname"
                    id="second_lastname"
                    autoComplete="family-name"
                    className={
                      errors.second_lastname
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.second_lastname && (
                    <FormError>{errors.second_lastname}</FormError>
                  )}
                </div>
              </div>
              {/* electronic email */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electronico
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.email) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={
                      errors.email
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.email && <FormError>{errors.email}</FormError>}
                </div>
              </div>

              {/* phone */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefono
                </label>
                <div className="mt-1">
                  <input
                    value={formatPhoneNumber(values && values.phone) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="(555) 222-4444"
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className={
                      errors.phone
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.phone && <FormError>{errors.phone}</FormError>}
                </div>
              </div>
              {/* Birthday */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  value={(values && values.birthday) || ``}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  autoComplete="bday"
                  type="date"
                  name="birthday"
                  id="birthday"
                  className={classNames(
                    color,
                    `mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`
                  )}
                />
              </div>
              {/* Personal Address */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calle
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.street_address) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    className={classNames(
                      color,
                      `block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ciudad
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.city) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className={classNames(
                      color,
                      `block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado / Provincia
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.state) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    className={classNames(
                      color,
                      `block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Codigo Postal
                </label>
                <div className="mt-1">
                  <input
                    value={(values && values.zipcode) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="number"
                    name="zipcode"
                    id="zipcode"
                    autoComplete="postal-code"
                    className={
                      errors.zipcode
                        ? `block w-full rounded-md border-red-500 shadow-sm sm:text-sm`
                        : classNames(color, inputCss)
                    }
                  />
                  {errors.zipcode && <FormError>{errors.zipcode}</FormError>}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informacion de Poliza de Seguro
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Poliza de seguro elegida por el cliente.
              </p>
            </div>
            {/* Insurance Policy */}
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="fecha-de-inscripcion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de inscripcion
                </label>
                <input
                  value={(values && values.insurance_date) || ``}
                  onFocus={handleFocus}
                  onChange={handleChange}
                  type="date"
                  name="insurance_date"
                  id="insurance_date"
                  className={classNames(
                    color,
                    `mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`
                  )}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="insurance_policy_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numero de poliza
                </label>
                <input
                  onFocus={handleFocus}
                  placeholder="55-55-555"
                  onChange={handleChange}
                  value={(values && values.insurance_policy_number) || ``}
                  type="number"
                  name="insurance_policy_number"
                  id="insurance_policy_number"
                  autoComplete="family-name"
                  className={classNames(
                    color,
                    `mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm`
                  )}
                />
              </div>
              {/* Companias de Seguros */}
              <div className="sm:col-span-3">
                <SelectInsuranceCompany
                  handleSelectCompany={handleChange}
                  value={values && values.insurance_company}
                />
              </div>
              <div className="sm:col-span-3">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tipo de Plan
                  </label>
                  <select
                    onFocus={handleFocus}
                    value={(values && values.plan) || `Basico`}
                    onChange={handleChange}
                    id="location"
                    name="plan"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
                  >
                    <option value="Basico">Basico</option>
                    <option value="Medio">Medio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Notas del cliente */}
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notas
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Aqui puede escribir anotaciones sobre el cliente
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="sm:col-span-6">
                <div className="mt-6">
                  <textarea
                    value={(values && values.notes) || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Ejemplo: Renovar poliza cada 6 meses."
                    id="notes"
                    name="notes"
                    rows={3}
                    className={classNames(
                      color,
                      `block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={handleUser}
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              disabled={Object.keys(errors).length > 0}
              onClick={handleSubmit}
              className={
                Object.keys(errors).length > 0
                  ? `ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm`
                  : `ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`
              }
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

EditUserForm.propTypes = {
  handleUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
