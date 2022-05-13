import { FormError } from "./userFormError";
import PropTypes from "prop-types";
import React from "react";
import { SelectInsuranceCompany } from "./selectInsuranceCompany";
import { classNames } from "../../utils/classNames";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { useRandomColor } from "../../hooks/user/useRandomColor";
const inputCss = `block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`;
//
export const NewUserForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  handleUser,
}) => {
  const { color, handleFocus } = useRandomColor();

  return (
    <div>
      <form className="space-y-8 divide-y divide-slate-200">
        <div className="space-y-8">
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-slate-900">
                Informacion Personal
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Llene los datos requeridos para crear un nuevo usuario.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* First and second names */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    value={values.first_name || ``}
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Segundo nombre
                </label>
                <div className="mt-1">
                  <input
                    value={values.secondary_name || ``}
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Primer apellido
                </label>
                <div className="mt-1">
                  <input
                    value={values.lastname || ``}
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Segundo apellido
                </label>
                <div className="mt-1">
                  <input
                    value={values.second_lastname || ``}
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Correo electronico
                </label>
                <div className="mt-1">
                  <input
                    value={values.email || ``}
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Telefono
                </label>
                <div className="mt-1">
                  <input
                    maxLength={14}
                    value={formatPhoneNumber(values.phone) || ``}
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
                  className="block text-sm font-medium text-slate-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  value={values.birthday || ``}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  autoComplete="bday"
                  type="date"
                  name="birthday"
                  id="birthday"
                  className={classNames(
                    color,
                    `mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`
                  )}
                />
              </div>
              {/* Personal Address */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-slate-700"
                >
                  Calle
                </label>
                <div className="mt-1">
                  <input
                    value={values.street_address || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    className={classNames(
                      color,
                      `block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-slate-700"
                >
                  Ciudad
                </label>
                <div className="mt-1">
                  <input
                    value={values.city || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className={classNames(
                      color,
                      `block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-slate-700"
                >
                  Estado / Provincia
                </label>
                <div className="mt-1">
                  <input
                    value={values.state || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    className={classNames(
                      color,
                      `block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`
                    )}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-slate-700"
                >
                  ZIP / Codigo Postal
                </label>
                <div className="mt-1">
                  <input
                    value={values.zipcode || ``}
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
              <h3 className="text-lg font-medium leading-6 text-slate-900">
                Informacion de Poliza de Seguro
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Poliza de seguro elegida por el cliente.
              </p>
            </div>
            {/* Insurance Policy */}
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="fecha-de-inscripcion"
                  className="block text-sm font-medium text-slate-700"
                >
                  Fecha de inscripcion
                </label>
                <input
                  value={values.insurance_date || ``}
                  onFocus={handleFocus}
                  onChange={handleChange}
                  type="date"
                  name="insurance_date"
                  id="insurance_date"
                  className={classNames(
                    color,
                    `mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`
                  )}
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="insurance_policy_number"
                  className="block text-sm font-medium text-slate-700"
                >
                  Numero de poliza
                </label>
                <input
                  onFocus={handleFocus}
                  placeholder="55-55-555"
                  onChange={handleChange}
                  value={values.insurance_policy_number || ``}
                  type="number"
                  name="insurance_policy_number"
                  id="insurance_policy_number"
                  autoComplete="family-name"
                  className={classNames(
                    color,
                    `mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm`
                  )}
                />
              </div>
              {/* Companias de Seguros */}
              <div className="sm:col-span-3">
                <SelectInsuranceCompany
                  handleSelectCompany={handleChange}
                  value={values.insurance_company}
                />
              </div>
              <div className="sm:col-span-3">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Tipo de Plan
                  </label>
                  <select
                    onFocus={handleFocus}
                    value={values.plan || `Basico`}
                    onChange={handleChange}
                    id="location"
                    name="plan"
                    className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base sm:text-sm"
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
              <h3 className="text-lg font-medium leading-6 text-slate-900">
                Notas
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Aqui puede escribir anotaciones sobre el cliente
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="sm:col-span-6">
                <div className="mt-6">
                  <textarea
                    value={values.notes || ``}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Ejemplo: Renovar poliza cada 6 meses."
                    id="notes"
                    name="notes"
                    rows={3}
                    className={classNames(
                      color,
                      `block w-full rounded-md border border-slate-300 shadow-sm sm:text-sm`
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
              className="rounded-md border border-slate-300 bg-slate-50 py-2 px-4 text-sm font-medium text-slate-800 shadow-lg shadow-slate-300/50 hover:bg-red-500 hover:text-white hover:shadow-red-500/50 hover:ring-red-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              disabled={Object.keys(errors).length > 0}
              onClick={handleSubmit}
              className={
                Object.keys(errors).length > 0
                  ? `ml-3 inline-flex justify-center rounded-md border border-transparent bg-slate-400 py-2 px-4 text-sm font-medium text-white shadow-sm`
                  : `ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-lg shadow-sky-500/50 hover:bg-sky-700 hover:shadow-sky-600/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`
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

NewUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleUser: PropTypes.func.isRequired,
};
