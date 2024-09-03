"use client";

import React, { createContext, useState, useEffect } from 'react';
export const FormContext = createContext();
import { GraphQLBackend } from '@lib/api/graphql';
import { debug } from 'console';
import Loader from '../components/loader';

export const FormProvider = ({ children }) => {
    const [brandsArray, setBrandsArray] = useState([]);
    const [modelsArray, setModelsArray] = useState([]);
    const [modificationsArray, setModificationsArray] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState({ id: '', text: 'Изберете' });
    const [selectedModel, setSelectedModel] = useState({ id: '', text: 'Изберете' });
    const [selectedModification, setSelectedModification] = useState({ id: '', text: 'Изберете' });
    const [selectedModificationFull, setSelectedModificationFull] = useState({ id: '', text: 'Изберете', horsePower: '', weight: '', coupe: '' });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getBrands();
    }, []);

    useEffect(() => {
        if (selectedBrand.id) {
            getModels(selectedBrand.id);
            setSelectedModel({ id: '', text: 'Изберете' });
            setSelectedModification({ id: '', text: 'Изберете' });
            setSelectedModificationFull({ id: '', text: 'Изберете', horsePower: '', weight: '', coupe: '' });
        }
    }, [selectedBrand]);

    useEffect(() => {
        if (selectedModel.id) {
            getModifications(selectedModel.id);
            setSelectedModification({ id: '', text: 'Изберете' });
            setSelectedModificationFull({ id: '', text: 'Изберете', horsePower: '', weight: '', coupe: '' });
        }
    }, [selectedModel]);

    useEffect(() => {
        if (selectedModification.id) {
            const modification = modificationsArray.find(mod => mod.id == selectedModification.id);

            setSelectedModificationFull(modification);
        }

    }, [selectedModification]);


    const getBrands = async () => {
        setLoading(true);
        const response = await GraphQLBackend.GetAllCarBrands();
        if (response.carBrands) {
            setBrandsArray(response.carBrands);
        }
        setLoading(false);
    };

    const getModels = async (brandId) => {
        setLoading(true);
        const response = await GraphQLBackend.GetCarModels({ brandId });
        if (response.carModels) {
            setModelsArray(response.carModels);
        }
        setLoading(false);
    };

    const getModifications = async (modelId) => {
        setLoading(true);
        const response = await GraphQLBackend.GetCarModifications({ modelId });
        if (response.carModifications) {
            setModificationsArray(response.carModifications);
        }
        setLoading(false);
    };

    const postBrand = async (data) => {
        setLoading(true);
        try {
            const response = await GraphQLBackend.postCarBrand({ name: data.name });
            getBrands();
            const id = response.createCarBrand.id;
            const text = response.createCarBrand.name;
            setSelectedBrand({ id, text });

            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }
        setLoading(false);
    };

    const postModel = async (data) => {
        setLoading(true);
        try {
            const response = await GraphQLBackend.postCarModel({ name: data.name, brandId: selectedBrand.id });
            getModels(selectedBrand.id);
            setSelectedModel({ id: response.createCarModel.id, text: response.createCarModel.name });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }
        setLoading(false);

    };

    const postModification = async (data) => {
        setLoading(true);
        try {
            const response = await GraphQLBackend.postCarModification({ name: data.name, modelId: selectedModel.id });
            getModifications(selectedModel.id);
            setSelectedModification({ id: response.createCarModification.id, text: response.createCarModification.name });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }
        setLoading(false);

    };

    const putBrand = async (data) => {
        setLoading(true);
        const CarBrandData = {
            id: data.id,
            name: data.name
        };

        try {
            const response = await GraphQLBackend.EditCarBrand({ data: CarBrandData });
            getBrands();
            const id = response.editCarBrand.id;
            const text = response.editCarBrand.name;
            setSelectedBrand({ id, text });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }
        setLoading(false);


    };

    const putModel = async (data) => {
        setLoading(true);
        const CarModelData = {
            id: data.id,
            name: data.name
        };

        try {
            const response = await GraphQLBackend.EditCarModel({ data: CarModelData });
            getModels(selectedBrand.id);

            setSelectedModel({ id: CarModelData.id, text: CarModelData.name });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        } finally {
            setLoading(false);
        }



    };

    const putModification = async (data) => {
        setLoading(true);
        if (data.action != undefined) {
            try {
                let response = await GraphQLBackend.deleteCarModification({ id: data.id });
                postModification(data);
                return { success: true, data: response.data };
            } catch (err) {
                return { success: false };

            }
        } else {

            const CarModificationData = {
                id: data.id,
                name: data.name,
                weight: parseFloat(data.weight),
                horsePower: data.horsePower,
                coupe: data.coupe
            };

            try {
                const response = await GraphQLBackend.EditCarModification({ data: CarModificationData });

                return { success: true, data: response.data };
            } catch (err) {
                console.error("Error during API call:", err);

                if (err.response && err.response.errors) {
                    let formattedErrors = {};
                    err.response.errors.forEach(error => {
                        const field = error.extensions?.field;

                        if (field) {
                            const formattedField = field.charAt(0).toLowerCase() + field.slice(1);
                            formattedErrors[formattedField] = error.message;
                        }
                    });

                    return { success: false, errors: formattedErrors };
                }

                return { success: false, errors: { general: "An unexpected error occurred" } };
            }
        }



        setLoading(false);

    };

    const deleteBrand = async (data) => {
        setLoading(true);
        try {
            let response = await GraphQLBackend.deleteCarBrand({ id: data.id });
            getBrands();
            setSelectedBrand({ id: '', text: 'Изберете' });
            setSelectedModel({ id: '', text: 'Изберете' });
            setSelectedModification({ id: '', text: 'Изберете' });
            setSelectedModificationFull({ id: '', text: 'Изберете', horsePower: '', weight: '', coupe: '' });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }
        setLoading(false);

    };


    const deleteModel = async (data) => {
        setLoading(true);
        try {
            let response = await GraphQLBackend.deleteCarModel({ id: data.id });
            getModels(selectedBrand.id);
            setSelectedModel({ id: '', text: 'Изберете' });
            setSelectedModification({ id: '', text: 'Изберете' });
            setSelectedModificationFull({ id: '', text: 'Изберете', horsePower: '', weight: '', coupe: '' });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }
        setLoading(false);

    };


    const deleteModification = async (data) => {
        setLoading(true);
        try {
            let response = await GraphQLBackend.deleteCarModification({ id: data.id });
            getModifications(selectedModel.id);
            setSelectedModification({ id: '', text: 'Изберете' });
            setSelectedModificationFull({ id: '', text: 'Изберете', horsePower: '', weight: '', coupe: '' });
            return { success: true };

        } catch (err) {

            if (err.response && err.response.errors) {
                err.response.errors.forEach(error => {
                    console.log(`Error ${error.message} at ${error.path[0]} `)
                });
            }

            return { success: false, errors: err.response.errors };
        }

        setLoading(false);

    };

    return (
        <>
            <FormContext.Provider value={{
                brandsArray, setBrandsArray,
                modelsArray, setModelsArray,
                modificationsArray, setModificationsArray,
                selectedBrand, setSelectedBrand,
                selectedModel, setSelectedModel,
                selectedModification, setSelectedModification, selectedModificationFull,
                getBrands, getModels, getModifications,
                postBrand, postModel, postModification,
                putBrand, putModel, putModification,
                deleteBrand, deleteModel, deleteModification,
                loading
            }}>
                {children}
            </FormContext.Provider>

            <div>
                {loading && <Loader />}
            </div>
        </>
    );
};