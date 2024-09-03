'use client'
import React, { useContext, useEffect, useState } from 'react';

import SelectWithInput from './SelectWithInput';
import { FormContext } from '../context/formContext';
import { useFormik } from 'formik';


export default function FormComponent() {


    const {
        brandsArray, selectedBrand, setSelectedBrand,
        modelsArray, selectedModel, setSelectedModel,
        modificationsArray, selectedModification, setSelectedModification, selectedModificationFull,
        getBrands, postBrand, putBrand, deleteBrand,
        getModels, postModel, putModel, deleteModel,
        getModifications, postModification, putModification, deleteModification,
    } = useContext(FormContext);

    const [coupe, setCoupe] = useState('');

    const coupeOptions = [
        "CONVERTIBLE",
        "COUPE",
        "HATCHBACK",
        "SEDAN",
        "SUV",
        "TRUCK",
        "VAN",
        "WAGON"
    ];




    const formik = useFormik({
        initialValues: {
            weight: selectedModificationFull ? selectedModificationFull.weight : '',
            horsePower: selectedModificationFull ? selectedModificationFull.horsePower : '',
            coupe: selectedModificationFull ? selectedModificationFull.coupe : ''

        },
        enableReinitialize: true,
        onSubmit: async (values, { setErrors }) => {

            const response = await putModification({
                id: selectedModification.id,
                weight: values.weight,
                horsePower: values.horsePower,
                name: selectedModification.text,
                coupe: values.coupe
            });

            if (response.errors) {
                setErrors(response.errors);
            };

        },
    });


    return (
        <>
           
            <div className="w-full lg:w-[800px] h-fit relative  shadow-md sm:rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  bg-gray-50 p-4">
                <p className="text-xl py-2 text-gray-800 font-semibold col-span-2">Списък с марки</p>
                    <div>
                        <SelectWithInput
                            options={brandsArray}
                            labelText="Марка"
                            onAdd={postBrand}
                            onEdit={putBrand}
                            onDelete={deleteBrand}
                            getVar={selectedBrand}
                            setVar={setSelectedBrand}
                            disabled="false"
                        />
                    </div>
                    <div>
                        <SelectWithInput
                            options={modelsArray}
                            labelText="Модел"
                            onAdd={postModel}
                            onEdit={putModel}
                            onDelete={deleteModel}
                            getVar={selectedModel}
                            setVar={setSelectedModel}
                            disabled={(modelsArray.length === 0 && selectedBrand.id === '') || selectedBrand.id === ''}

                        />
                    </div>
                    <div>
                        <SelectWithInput
                            options={modificationsArray}
                            labelText="Модификация"
                            onAdd={postModification}
                            onEdit={putModification}
                            onDelete={deleteModification}
                            getVar={selectedModification}
                            setVar={setSelectedModification}
                            disabled={(modificationsArray.length === 0 && selectedModel.id === '') || selectedModel.id === ''}
                        />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="lg:col-span-2 grid  lg:grid-cols-2 gap-4">
                        <div className="w-full">
                            <label htmlFor="weight">Тегло</label>
                            <input
                                type="text"
                                name="weight"
                                className="w-full border border-gray-400 rounded-md p-1 px-2"
                                value={formik.values.weight}
                                onChange={formik.handleChange}
                                disabled={selectedModification.id == ''}
                            />

                            {formik.errors.weight ? (
                                <div className="text-red-500">{formik.errors.weight}</div>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <label htmlFor="horsePower">Конски сили</label>
                            <input
                                type="text"
                                name="horsePower"
                                className="w-full border border-gray-400 rounded-md p-1 px-2"
                                value={formik.values.horsePower}
                                onChange={formik.handleChange}
                                disabled={selectedModification.id == ''}
                            />

                            {formik.errors.horsePower ? (
                                <div className="text-red-500">{formik.errors.horsePower}</div>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <label htmlFor="horsePower">Купе</label>
                            <select
                                name="coupe"
                                id="coupe"
                                className="w-full border border-gray-400 rounded-md p-1 px-2"
                                value={formik.values.coupe}
                                onChange={formik.handleChange}
                                disabled={selectedModification.id == ''}
                            >

                                <option value="">Изберете купе</option>
                                {coupeOptions.map(option => (
                                    <option
                                        key={option}
                                        value={option}

                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {formik.errors.horsePower ? (
                                <div className="text-red-500">{formik.errors.horsePower}</div>
                            ) : null}
                        </div>
                        <div className="lg:col-span-2">
                            <button className="px-6 py-2 rounded-md text-white bg-green-600">Запиши</button>
                        </div>
                    </form>
                </div>



            </div>
        </>

    );
};

