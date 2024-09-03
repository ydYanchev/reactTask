import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal(data) {

    return (
        <div className="fixed bg-[#00000070] backdrop-blur-sm top-0 left-0 w-full h-full flex justify-center items-center z-10">
            <div className="relative">
                <div className="w-full mx-auto lg:w-2xl h-fit p-5 bg-white rounded-lg">
                    <p className="text-lg text-gray-900 pb-2">
                        Редакция на {data.data.labelText} {data.data.getVar.text}
                    </p>
                    <Formik
                        initialValues={{ name: data.data.getVar.text, id: data.data.getVar.id, action: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            let response;

                            if (values.action === 'edit') {
                                response = await data.data.onEdit(values);
                               
                            } else if (values.action === 'delete') {
                        
                                response = await data.data.onDelete(values);
                            }
                          
                            if(response.success){
                                data.handleOpenModal(); 
                            }else{
                                alert('Изникна проблем. Моля, опитайте отново.');
                            }

                        }}
                    >
                        {({ handleChange, setFieldValue, values }) => (
                            <Form className="border-t border-gray-300 py-2">
                                <Field type="hidden" name="action" />
                                <Field type="hidden" name="id" value={values.id} />

                                <div>
                                    <label htmlFor="name">{data.data.labelText}</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        value={values.name || ''}
                                        onChange={handleChange}
                                        className="w-full border border-gray-400 rounded-md p-1 px-2 mt-2"
                                    />
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        type="submit"
                                        onClick={() => setFieldValue('action', 'edit')}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg"
                                    >
                                        Редакция
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={() => setFieldValue('action', 'delete')}
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-white" /> Изтриване
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div
                    className="absolute -top-3 -right-3 bg-red-600 text-white flex items-center justify-center w-8 h-8 text-2xl font-semibold rounded-full cursor-pointer"
                    onClick={data.handleOpenModal}
                >
                    <FontAwesomeIcon icon={faXmark} className="text-white" />
                </div>
            </div>
        </div>
    );
};
