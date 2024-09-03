import { GraphQLBackend } from '@lib/api/graphql'
import TestCors from '@/app/TestCors'
import { FormProvider } from '../context/formContext';
import FormComponent from '../components/form';


import React, { useContext } from 'react';

export default async function Edit() {


  return (

    <div className="container mx-auto py-[50px]">
     
      <FormProvider>
        <FormComponent />
      </FormProvider>

    </div>

  )


}