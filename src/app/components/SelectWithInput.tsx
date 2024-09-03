'use client'
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from 'formik';
import { GraphQLBackend } from '@lib/api/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal';

export default function SelectWithInput(data) {
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
        setSearchValue('');
    };

    const [searchValue, setSearchValue] = useState('');
    let filteredOptions = data.options.filter(option =>
        option.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleSelectedValueClick = (event) => {
        const id = event.target.dataset.id;
        const text = event.target.dataset.text;

        data.setVar({ id, text });

        setIsVisible(prev => !prev);
        setSearchValue('');
    };
  

    return (
        <>
            <div className="w-full">
                <label htmlFor="Marka">{data.labelText}</label>
                <div className="relative shadow-2xl" ref={wrapperRef}>
                    <div className="flex gap-2 items-stretch">

                        <div onClick={toggleVisibility} className="grow">
                            <input type="text" disabled={data.disabled === true} value={data.getVar.text} name={data.for} onChange={(e) => console.log(e.target.value)} className="w-full border border-gray-400 rounded-md p-1 px-2 select-none" />
                        </div>

                        {data.getVar.id && data.getVar.id !== "0" && (
                            <div className="flex items-center">
                                <button className="h-full flex items-center justify-center bg-green-600 p-2 rounded-md" onClick={handleOpenModal}  >
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-white" />
                                </button>
                            </div>
                        )}
                    </div>

                    {isVisible && (
                        <div className='border border-gray-300 shadow-xl mt-1 rounded-md p-1 px-2 absolute z-10 bg-white w-full'>

                            <Formik
                                initialValues={{ name: '' }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    const response = await data.onAdd(values);
                                    if (response.success === true) {
                                        toggleVisibility();
                                        setSearchValue('');
                                    }else{
                                        alert('Изникна проблем. Моля, опитайте отново.');
                                    }
                                    
                                    setSubmitting(false);
                                }}
                            >

                                {({ isSubmitting, setFieldValue, values }) => (
                                    <Form >

                                        <Field type="text" name="name" value={values.name} onChange={(e) => {
                                            setFieldValue("name", e.target.value);
                                            setSearchValue(e.target.value);
                                        }} className="w-full border border-gray-300 rounded-md p-1 px-2" />

                                        {filteredOptions.length > 0 ? (
                                            <div className="h-[200px] overflow-y-auto ">
                                                {filteredOptions?.map((option) => (
                                                    <p key={option.id} onClick={handleSelectedValueClick} data-id={option.id} data-text={option.name} className="w-full text-sm hover:bg-blue-500 hover:text-white py-2 px-2 cursor-pointer" >{option.name}</p>
                                                ))}
                                            </div>
                                        ) :
                                            (
                                                <div className="mt-2 border-t border-gray-300">
                                                    <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-6 py-2 w-fit mx-auto text-center my-3 rounded-md cursor-pointer">Добави</button>
                                                </div>
                                            )}

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}


                    {isModalOpen && (
                        <Modal
                            data={data}
                            handleOpenModal={handleOpenModal}
                        />
                    )}

                </div>
            </div>

        </>
    );
};





